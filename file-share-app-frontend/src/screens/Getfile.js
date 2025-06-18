import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import '../styles/getfile.css'
import api from '../services/api'

const Getfile = () => {
  const { hash } = useParams()
  const [fileData, setFileData] = useState(null)

  useEffect(() => {
    api
      .get(`/file/${hash}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setFileData(data)
      })
      .catch((error) => {
        console.log(error);
        alert('File not found or link expired');
      })
  }, [hash])

  return (
    <div className='container'>
      {/* <p>{fileData?.fileSize}</p>
            <p>{fileData?.fileType}</p> */}
      {fileData ? <img src={fileData?.publicUrl} alt="image" className='fileImg' /> : null}
      <b>{fileData?.fileName}</b>
      <div className='btn-div'>
        <button className='button' onClick={async () => {
          try {
            // Use our backend download endpoint
            const response = await api.get(`/download-public/${hash}`, {
              responseType: 'blob'
            });
            
            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(response.data);
            
            // Create a temporary anchor element and trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = fileData?.filename || fileData?.fileName || 'download';
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download file');
          }
        }}>Click to download</button>
      </div>
    </div>
  )
}
export default Getfile