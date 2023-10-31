import React, { useState } from 'react'
import axios from "axios"
import Uploader from '../components/Uploader'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(false);


  const handleSubmit = (file) => {
    setLoading(true);
    const formData = new FormData();
    // console.log("here", file.originFileObj)
    formData.append("file", file);

    axios
      .post(`https://fileshare-server-f061.onrender.com/api/upload`, formData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setLink(data.newFile.shortUrl)
        // navigate(`/${data.newFile.shortUrl}`)
      })
      .catch((error) => {
        console.log(error);
        //   return alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(file)
  }


  return (
    <>
      <div className='uploadBox'>
        <Uploader handleSubmit={handleSubmit} />
        {loading ? (
          <div className="loader">Loading...</div>
        ) : link && (
          <a className="download-link" href={`https://file-share-app-sigma.vercel.app/${link}`}>
            {`https://file-share-app-sigma.vercel.app/${link}`}
          </a>
        )}
      </div>
    </>
  )
}
export default Home