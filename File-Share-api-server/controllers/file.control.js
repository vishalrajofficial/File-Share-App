import admin from "../firebase-connect.js";
import File from "../models/file.model.js";
import crypto from "crypto";
import asyncCatch from "../middlewares/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";

const getFilePublicUrl = async (bucket, fileName) => {
  try {
    const [url] = await bucket.file(fileName).getSignedUrl({
      action: "read",
      expires: "03-01-2028",
    });
    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const upload_file = asyncCatch(async (req, res, next) => {

  const file = req.file;
  // Get the authenticated user's ID from req.user (set by auth middleware)
  const owner_id = req.user ? req.user._id : null;

  if (!file) {
    return res.status(400).json({
      success: false,
      error: "No file uploaded",
    });
  }

  const new_file_name = Date.now() + "-" + file.originalname;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const bucket = admin.storage().bucket();
  const fileUpload = bucket.file(new_file_name);
  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
      expires: expirationDate.toISOString(),
    },
  });

  blobStream.on("error", (error) => {
    console.log(error);
    return next(new ErrorHandler("Cloud Server error", 400));
  });

  blobStream.on("finish", async () => {
    // Get the public URL for the uploaded file
    const publicUrl = await getFilePublicUrl(bucket, fileUpload.name);

    //Generate short link
    const shortUrl = crypto.createHash("shake256", { outputLength: 4 }).update(publicUrl).digest("hex");

    //Save file metadata to mongoDB
    const newFile = new File({
      shortUrl,
      originalname: file.originalname,
      filename: fileUpload.name,
      fileSize: file.size,
      fileType: file.mimetype,
      fileUrl: publicUrl,
      owner_id : owner_id
    });

    await newFile.save();

    res.json({
      success: true,
      newFile,
    });
  });

  blobStream.end(file.buffer);
});


//get file from shortUrl
const get_file = asyncCatch( async (req, res, next) => {

    const file = await File.findOne({ shortUrl: req.params.shortUrl });
    if (!file) {
        return next(new ErrorHandler("File not found!", 404));
    }

    return res.status(200).json({
      filedata: file,
      success: true,
      filename: file.originalname,
      publicUrl: file.fileUrl,
    });

});


//get all files of a user
const all_files = asyncCatch( async(req, res, next) => {
  // Get user ID from the authenticated user (set by auth middleware)
  const userId = req.user._id;
  console.log('Fetching files for user:', userId);
  
  const files = await File.find({ 'owner_id' : userId });
  

  res.status(200).json({
      success: true,
      files
  })
});


//delete a file
const delete_file = asyncCatch(async (req, res, next)=>{
  let file  = await File.findById(req.params.id);

  if(!file){
    return next(new ErrorHandler("File not found!", 404));
  }

  if(!file.owner_id){
    return next(new ErrorHandler("You are not authorized to delete this file", 404));
  }

  if(file.owner_id.toString() !== req.user._id.toString()){
    return next(new ErrorHandler("You are not authorized to delete this file", 401));
  }

  // Remove file from Firebase Storage
  const bucket = admin.storage().bucket();
  try {
    await bucket.file(file.filename).delete();
  } catch (error) {
    console.error("Error deleting file from storage:", error);
  }

  // Delete file entry from mongoDB
  await File.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success : true,
    message : "File deleted successfully"
  })
});

//download a file
const download_file = asyncCatch(async (req, res, next) => {
  const file = await File.findById(req.params.id);
  
  if (!file) {
    return next(new ErrorHandler("File not found!", 404));
  }

  // Check if user is authorized to download this file
  if (file.owner_id && file.owner_id.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorized to download this file", 401));
  }

  try {
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(file.filename);
    
    // Check if file exists in storage
    const [exists] = await fileRef.exists();
    if (!exists) {
      return next(new ErrorHandler("File not found in storage", 404));
    }

    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalname}"`);
    res.setHeader('Content-Type', file.fileType || 'application/octet-stream');
    
    // Stream the file from Firebase Storage to the response
    const stream = fileRef.createReadStream();
    
    stream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        return next(new ErrorHandler("Error downloading file", 500));
      }
    });

    stream.pipe(res);
    
  } catch (error) {
    console.error('Download error:', error);
    return next(new ErrorHandler("Error downloading file", 500));
  }
});

//download a file by shortUrl (public access)
const download_file_public = asyncCatch(async (req, res, next) => {
  const file = await File.findOne({ shortUrl: req.params.shortUrl });
  
  if (!file) {
    return next(new ErrorHandler("File not found!", 404));
  }

  try {
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(file.filename);
    
    // Check if file exists in storage
    const [exists] = await fileRef.exists();
    if (!exists) {
      return next(new ErrorHandler("File not found in storage", 404));
    }

    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalname}"`);
    res.setHeader('Content-Type', file.fileType || 'application/octet-stream');
    
    // Stream the file from Firebase Storage to the response
    const stream = fileRef.createReadStream();
    
    stream.on('error', (error) => {
      console.error('Download stream error:', error);
      if (!res.headersSent) {
        return next(new ErrorHandler("Error downloading file", 500));
      }
    });

    stream.pipe(res);
    
  } catch (error) {
    console.error('Download error:', error);
    return next(new ErrorHandler("Error downloading file", 500));
  }
});

export { upload_file, get_file, all_files, delete_file, download_file, download_file_public };
