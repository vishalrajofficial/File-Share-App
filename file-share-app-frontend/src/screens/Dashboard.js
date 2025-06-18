import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchUserFiles();
  }, [navigate]);

  const fetchUserFiles = async () => {
    try {
      const response = await api.get('/files/all');
      setFiles(response.data.files || []);
    } catch (err) {
      console.error('Error fetching files:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError('Failed to load your files');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.get('/user/logout');
      localStorage.removeItem('user');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await api.delete(`/file/${fileId}`);
        setFiles(files.filter(file => file._id !== fileId));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete file');
      }
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      // Use our backend download endpoint
      const response = await api.get(`/download/${fileId}`, {
        responseType: 'blob'
      });
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(response.data);
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        alert('Failed to download file');
      }
    }
  };

  const copyToClipboard = (url, shortUrl) => {
    navigator.clipboard.writeText(url).then(() => {
      // Show a temporary success message
      const button = document.getElementById(`copy-${shortUrl}`);
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('copied');
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy link to clipboard');
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Filter and sort files
  const filteredFiles = files.filter(file => 
    file.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.originalname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'name') {
      return (a.originalname || a.fileName).localeCompare(b.originalname || b.fileName);
    } else if (sortBy === 'size') {
      return b.fileSize - a.fileSize;
    }
    return 0;
  });

  return (
    <div className="dashboard-container">
      {/* Animated Background */}
      <div className="dashboard-bg">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-logo">FileShare</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.name}</span>
            <button className="upload-btn" onClick={() => navigate('/upload')}>
              <span>+</span> Upload New
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="section-header">
            <h2 className="section-title">Your Shared Files</h2>
            <div className="section-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your files...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={fetchUserFiles}>Try Again</button>
            </div>
          ) : sortedFiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <h3>No files found</h3>
              <p>{searchTerm ? 'No files match your search.' : 'Start sharing files by uploading your first one!'}</p>
              <button className="cta-button" onClick={() => navigate('/upload')}>
                Upload Your First File
              </button>
            </div>
          ) : (
            <div className="files-grid">
              {sortedFiles.map((file, index) => (
                <div 
                  key={file._id} 
                  className="file-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="file-preview">
                    {file.fileType?.startsWith('image/') ? (
                      <img src={file.fileUrl || file.publicUrl} alt={file.originalname || file.fileName} />
                    ) : (
                      <div className="file-icon-wrapper">
                        <div className="file-icon">
                          {file.fileType?.includes('pdf') ? '📄' : 
                           file.fileType?.includes('video') ? '🎥' : 
                           file.fileType?.includes('audio') ? '🎵' : 
                           file.fileType?.includes('zip') || file.fileType?.includes('rar') ? '📦' :
                           file.fileType?.includes('doc') || file.fileType?.includes('docx') ? '📝' :
                           file.fileType?.includes('xls') || file.fileType?.includes('xlsx') ? '📊' :
                           file.fileType?.includes('ppt') || file.fileType?.includes('pptx') ? '📑' : '📎'}
                        </div>
                        <span className="file-extension">
                          {(file.originalname || file.fileName)?.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="file-info">
                    <h4 className="file-name" title={file.originalname || file.fileName}>
                      {file.originalname || file.fileName}
                    </h4>
                    <p className="file-meta">
                      {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                    </p>
                    <div className="file-actions">
                      <button 
                        id={`copy-${file.shortUrl}`}
                        className="action-btn copy-btn"
                        onClick={() => copyToClipboard(`${window.location.origin}/${file.shortUrl}`, file.shortUrl)}
                        title="Copy share link"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                      </button>
                      <button 
                        className="action-btn download-btn"
                        onClick={() => handleDownload(file._id, file.originalname || file.fileName)}
                        title="Download file"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(file._id)}
                        title="Delete file"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 