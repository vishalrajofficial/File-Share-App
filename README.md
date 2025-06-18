# 📁 File Share App

> A modern, secure file upload and sharing platform with short link generation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fsmart.vercel.app-blue)](https://fsmart.vercel.app/)

## 🚀 Overview

File Share App is a full-stack web application that allows users to securely upload files and generate short, shareable links. Built with modern web technologies, it provides a seamless experience for file sharing across platforms.

## ✨ Features

### 🎨 Frontend
- **Secure File Upload** - Upload files up to 10MB with format validation
- **Short Link Generation** - Create easy-to-share URLs for your files
- **Smart Search** - Find files using short link references
- **Responsive Design** - Works seamlessly across all devices
- **User Authentication** - Secure login and registration system
- **Real-time Feedback** - Instant upload progress and status updates

### ⚙️ Backend
- **Robust File Handling** - Comprehensive error handling and validation
- **Collision-Free URLs** - Advanced algorithm prevents duplicate short links
- **Secure Storage** - Files stored safely in Firebase Cloud Storage
- **RESTful API** - Clean, documented API endpoints
- **Database Integration** - MongoDB for reliable data persistence

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React, CSS3, HTML5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Storage** | Firebase Storage |
| **Authentication** | JWT, Firebase Auth |
| **Deployment** | Vercel (Frontend), Fly.io (Backend) |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Firebase** account with Storage enabled

## 🚀 Quick Start

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishalrajofficial/File-Share-App.git
   cd File-Share-App/file-share-app-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update the base URL in your API configuration to point to your backend
   - For local development: `http://localhost:8000`

4. **Start the development server**
   ```bash
   npm start
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd File-Share-App/File-Share-api-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   DB_URL=your_mongodb_connection_string
   COOKIE_EXPIRY=7200000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firebase Storage
   - Generate service account credentials (JSON file)
   - Place the credentials file as `firebase-cred.json` in the backend root directory

5. **Start the server**
   ```bash
   npm start
   ```

## 🏗️ Project Structure

```
File-Share/
├── file-share-app-frontend/     # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── screens/             # Page components
│   │   ├── context/             # React Context providers
│   │   ├── services/            # API service functions
│   │   └── styles/              # CSS stylesheets
│   └── public/                  # Static assets
│
└── File-Share-api-server/       # Node.js backend API
    ├── controllers/             # Request handlers
    ├── models/                  # Database schemas
    ├── routers/                 # API route definitions
    ├── middlewares/             # Custom middleware functions
    └── utils/                   # Utility functions
```

## 🔐 Security Features

- **File Validation** - Strict file type and size validation
- **JWT Authentication** - Secure token-based authentication
- **Error Handling** - Comprehensive error catching and logging
- **Input Sanitization** - Protection against malicious inputs
- **CORS Configuration** - Proper cross-origin resource sharing setup

## 🎯 Architecture Decisions

### Short URL Generation
- **Algorithm**: SHA-256 hashing with timestamp and file URL
- **Benefits**: Deterministic, collision-resistant, and URL-safe
- **Collision Handling**: Built-in collision detection and regeneration

### File Storage Strategy
- **Firebase Storage**: Chosen for scalability, security, and reliability
- **Benefits**: Built-in CDN, access control, and seamless integration
- **Backup Strategy**: Automatic redundancy through Firebase infrastructure

### Database Design
- **MongoDB**: Document-based storage for flexibility
- **Mongoose ODM**: Type safety and validation
- **Indexing**: Optimized queries for short URL lookups

## 🚧 Known Limitations

- File size limit: 10MB per upload
- Supported formats: Images, documents, and common file types
- Storage quota based on Firebase plan

## 🔮 Future Enhancements

- [ ] **User Dashboard** - Comprehensive file management interface
- [ ] **File Expiration** - Automatic cleanup of expired files
- [ ] **Analytics** - Download tracking and usage statistics
- [ ] **Batch Upload** - Multiple file upload support
- [ ] **File Preview** - In-browser file preview functionality
- [ ] **API Rate Limiting** - Enhanced security measures
- [ ] **Mobile App** - Native mobile applications

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for reliable cloud storage
- MongoDB for flexible data storage
- React community for excellent documentation

---

<div align="center">
  <strong>Built with ❤️</strong>
</div>
