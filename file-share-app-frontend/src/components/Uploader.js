import { useState } from 'react'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

function Uploader({ handleSubmit }) {
    const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")

  const generateLink = () => {
    if(!file) return alert("Please select a file")
    handleSubmit(file)
    setFile(null)
    setImage(null)
    setFileName("No selected file")
  }
  return (
    <div className='uploaderBox'>
      <form
      onClick={() => document.querySelector(".input-field").click()}
        className='uploader'
      >
        <input type="file" accept='image/*' className='input-field' hidden 
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
            setFile(files[0])
          if(files){
            setImage(URL.createObjectURL(files[0]))
          }
        }}
         />

        {image ?
        <img src={image} width={150} height={150} alt={fileName} />
        : 
        <>
        <MdCloudUpload color='#1475cf' size={60} />
        <p>Browse Files to upload</p>
        </>
      }

      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='#1475cf' />
        <span className='upload-content'>
          {fileName} - 
          <MdDelete
          onClick={() => {
            setFileName("No selected File")
            setFile(null)
            setImage(null)
          }}
           />
        </span>
        
      </section>
      <button onClick={generateLink} className='upload-btn'>Generate Shorten Link</button>
    </div>
  )
}

export default Uploader