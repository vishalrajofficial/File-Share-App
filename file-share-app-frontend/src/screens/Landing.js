import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      {/* Header with Sign In button */}
      <header className="landing-header">
        <div className="logo">
          <h2>FileShare</h2>
        </div>
        <button className="sign-in-btn" onClick={handleSignIn}>
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Share Files</span>
            <br />
            <span className="gradient-text">Instantly</span>
          </h1>
          <p className="hero-subtitle">
            Upload your files and get shareable links in seconds.
            <br />
            Simple, fast, and secure file sharing.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Short Links
          </button>
        </div>

        {/* Animated Background Elements */}
        <div className="animated-bg">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>
      </main>

      {/* Features Section (Optional) */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📤</div>
          <h3>Easy Upload</h3>
          <p>Drag and drop or click to upload</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Instant Links</h3>
          <p>Get shareable links immediately</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Your files are safe with us</p>
        </div>
      </section>
    </div>
  );
};

export default Landing; 