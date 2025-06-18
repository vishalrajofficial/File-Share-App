import React, { useState, useEffect } from 'react'
import Uploader from '../components/Uploader'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Home = () => {
  const navigate = useNavigate()
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleSubmit = (file) => {
    setLoading(true);
    setLink(null);
    const formData = new FormData();
    formData.append("file", file);

    api
      .post(`/upload`, formData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        const shortUrl = data.newFile.shortUrl;
        const fullLink = `${window.location.origin}/${shortUrl}`;
        setLink(fullLink);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          alert('Session expired. Please login again.');
          localStorage.removeItem('user');
          navigate('/login');
        } else {
          alert(error.response?.data?.message || 'Upload failed. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    const button = document.querySelector('.copy-link-btn');
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(() => {
      button.textContent = 'Copy Link';
      button.classList.remove('copied');
    }, 2000);
  };

  return (
    <div className='upload-page'>
      {/* Header */}
      <header className="upload-header">
        <h1 className="upload-logo">FileShare</h1>
        <div className="header-nav">
          <button onClick={() => navigate('/dashboard')} className="nav-btn">
            My Files
          </button>
          <button onClick={() => {
            localStorage.removeItem('user');
            navigate('/');
          }} className="nav-btn logout">
            Logout
          </button>
        </div>
      </header>

      {/* Upload Box */}
      <div className='uploadBox'>
        <h2 className="upload-title">Upload Your File</h2>
        <p className="upload-subtitle">Share your files instantly with a short link</p>
        
        <Uploader handleSubmit={handleSubmit} />
        
        {loading && (
          <div className="upload-loading">
            <div className="spinner"></div>
            <p>Uploading your file...</p>
          </div>
        )}
        
        {link && !loading && (
          <div className="link-result">
            <h3>Success! Your file is ready to share</h3>
            <div className="link-box">
              <input 
                type="text" 
                value={link} 
                readOnly 
                className="link-input"
              />
              <button 
                className="copy-link-btn"
                onClick={copyToClipboard}
              >
                Copy Link
              </button>
            </div>
            <div className="link-actions">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-link"
              >
                View File
              </a>
              <button 
                onClick={() => navigate('/dashboard')}
                className="manage-link"
              >
                Manage Files
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home