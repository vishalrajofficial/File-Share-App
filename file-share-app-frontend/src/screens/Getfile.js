import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import '../styles/getfile.css'
const Getfile = () => {
  const { hash } = useParams()
  const [fileData, setFileData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://fileshare-server-f061.onrender.com/api/file/${hash}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setFileData(data)
      })
      .catch((error) => {
        console.log(error);
        //   return alert(error.message);
      })
  }, [])

  return (
    <div className='container'>
      <div>
        <b>{fileData?.fileName}</b>
        {/* <p>{fileData?.fileSize}</p>
            <p>{fileData?.fileType}</p> */}
        {fileData? <img src={fileData?.publicUrl} alt="image" /> : null}
        <button className='button' onClick={() => window.open(fileData?.publicUrl)}>Download</button>
      </div>
    </div>
  )
}
export default Getfile