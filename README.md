# File Share App

**File Upload and Short Link Generation Platform**

[https://fsmart.vercel.app/](https://fsmart.vercel.app/)

**API**: [https://farmartbackend.fly.dev/](https://farmartbackend.fly.dev/)

## Features

### Frontend Features:
- Upload file (size < 10MB & specified formats only)
- Short Link generation for easy sharing
- Search for a given short Link
- Cross-platform

### Backend Features:
- Upload any file with robust error handling
- Short Link generation with collision avoidance

## Tech Stack

- **Client:** React
- **Server:** Node, Express, MongoDB
- **Cloud:** Google Firebase

## Installation - Front-end

1. Clone the repository:

```bash
git clone https://github.com/vishalrajofficial/File-Share-App.git
```

2. Navigate to the project directory:

```bash
cd file-share-app-frontend
```

3. Install dependencies using npm:

```bash
npm install
```

4. Change the base URL to `http://localhost:3000`

## Installation - Backend

**Prerequisites:**

- Node.js (v12 or above)
- NPM (Node Package Manager)
- MongoDB (Make sure MongoDB is installed and running locally or provide a remote MongoDB connection URL)
- Firebase Admin credentials (You need to set up a Firebase project and obtain the service account credentials in JSON format)

1. Clone the repository:

```bash
git clone https://github.com/vishalrajofficial/File-Share-App.git
```

2. Navigate to the project directory:

```bash
cd File-Share-api-server
```

3. Install dependencies using npm:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the server directory of the project. Add the following environment variables to the `.env` file:

```env
PORT = 8000
DB_URL = 'Your MongoDB URL'
COOKIE_EXPIRY = <Number>
```

2. Set up a Firebase Project:

- Go to the Firebase Console (https://console.firebase.google.com/).
- Click on "Add Project" or select an existing project.
- Follow the instructions to set up your project.

3. Enable Firebase Admin SDK:

- Go to the Firebase Console.
- Select your project.
- Navigate to the "Project Settings."
- Go to the "Service Accounts" tab.
- Click on "Generate New Private Key" to download the service account credentials file (in JSON format). This file contains the necessary credentials to access Firebase services programmatically.

4. Move the credentials file to the backend project directory (where the Node.js server code resides).

### Implementation Choices

**Backend Framework:**

- Node.js and Express: Chosen for their lightweight and efficient nature, allowing for quick development of RESTful APIs. Express provides a robust set of features, middleware support, and a large ecosystem of extensions.
- MongoDB and Mongoose: Utilized as the database technology to store file records and user information. MongoDB's flexible document-based storage model and Mongoose's object data modeling (ODM) provide easy integration with Node.js.

**Short URL Generation:**

- SHA256 Hashing Algorithm: Implemented SHA hashing algorithm to generate short URLs based on the timestamp of file upload and the public URL. SHA256 provides a unique and deterministic hash value for a given input, ensuring consistent and collision-resistant short URL generation.

**File Storage:**

- Firebase Storage: Leveraged Firebase Storage to store and manage uploaded files securely. Firebase Storage offers scalable and reliable cloud storage with easy integration, access control rules, and compatibility with Firebase Authentication for authorization.

### Challenges Faced

1. **Frontend Routing:** Addressing issues with frontend routing on remote servers, especially with hosting services like Fly.io and Vercel. This was resolved by deploying files with Firebase.

2. **Hosting Considerations:** Overcoming hosting challenges to ensure smooth application performance.


### Future Improvements

1. **Enhanced Access Control:** Implement user roles and permissions for better file management.

2. **File Expiration Policies:** Allow users to set expiration dates for shared files.
