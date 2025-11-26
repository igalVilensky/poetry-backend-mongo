# 🎭 Poetry Backend with MongoDB

A robust Express.js backend API for a poetry website, providing audio streaming from Google Drive, user engagement features (likes and comments), and MongoDB data persistence.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 🎵 Audio Streaming
- Stream audio files directly from Google Drive
- Support for both streaming and downloading
- Optimized for MP3 format
- Efficient streaming with minimal memory footprint

### 💙 Like System
- Session-based like tracking
- Toggle like/unlike functionality
- Real-time like count updates
- Slug-based post identification

### 💬 Comment System
- Create and retrieve comments per post
- Author and avatar support
- Timestamp tracking
- Comment likes functionality
- Sorted by date (newest first)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **HTTP Client**: Axios
- **Middleware**: CORS, dotenv
- **Architecture**: RESTful API

## 📁 Project Structure

```
poetry-backend-with-mango/
├── src/
│   ├── index.js                 # Application entry point
│   ├── models/                  # Mongoose schemas
│   │   ├── Comment.js          # Comment model
│   │   └── Like.js             # Like model
│   └── routes/                  # API route handlers
│       ├── commentRoutes.js    # Comment endpoints
│       ├── likeRoutes.js       # Like endpoints
│       └── streamAudio.js      # Audio streaming endpoint
├── .env                         # Environment variables (not in repo)
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local instance or MongoDB Atlas account)
- **Google Drive** (for hosting audio files)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poetry-backend-with-mango
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/poetry-db
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/poetry-db
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000` (or your configured PORT).

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `MONGODB_URI` | MongoDB connection string | Yes | - |

### CORS Configuration

By default, CORS is enabled for all origins. To restrict access, modify the CORS middleware in `src/index.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

---

### 🎵 Audio Streaming

#### Stream Audio File
```http
GET /stream-audio?trackId={googleDriveFileId}&download={true|false}
```

**Query Parameters:**
- `trackId` (required): Google Drive file ID
- `download` (optional): Set to `"true"` to force download instead of streaming

**Response:**
- Content-Type: `audio/mpeg`
- Streams MP3 audio data

**Example:**
```bash
curl "http://localhost:5000/stream-audio?trackId=1a2b3c4d5e6f7g8h9i0j"
```

---

### 💙 Likes

#### Toggle Like
```http
POST /api/likes/:slug/toggle
```

**URL Parameters:**
- `slug`: Post/poem slug identifier

**Request Body:**
```json
{
  "sessionId": "unique-session-identifier"
}
```

**Response:**
```json
{
  "isLiked": true,
  "count": 42
}
```

#### Get Like Status
```http
GET /api/likes/:slug?sessionId={sessionId}
```

**URL Parameters:**
- `slug`: Post/poem slug identifier

**Query Parameters:**
- `sessionId`: User's session identifier

**Response:**
```json
{
  "isLiked": false,
  "count": 42
}
```

---

### 💬 Comments

#### Add Comment
```http
POST /api/comments/:slug
```

**URL Parameters:**
- `slug`: Post/poem slug identifier

**Request Body:**
```json
{
  "author": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "content": "Beautiful poem!"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "postId": "my-poem-slug",
  "author": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "content": "Beautiful poem!",
  "date": "2025-11-26T20:32:04.000Z",
  "likes": 0
}
```

#### Get Comments
```http
GET /api/comments/:slug
```

**URL Parameters:**
- `slug`: Post/poem slug identifier

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "postId": "my-poem-slug",
    "author": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "content": "Beautiful poem!",
    "date": "2025-11-26T20:32:04.000Z",
    "likes": 5
  }
]
```

#### Like Comment
```http
POST /api/comments/:slug/:commentId/like
```

**URL Parameters:**
- `slug`: Post/poem slug identifier
- `commentId`: MongoDB ObjectId of the comment

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "postId": "my-poem-slug",
  "author": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "content": "Beautiful poem!",
  "date": "2025-11-26T20:32:04.000Z",
  "likes": 6
}
```

---

## 🔧 Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Models

#### Like Model
```javascript
{
  postId: String,      // Post slug
  sessionId: String    // User session identifier
}
```

#### Comment Model
```javascript
{
  postId: String,      // Post slug
  author: String,      // Default: "Anonymous"
  avatar: String,      // Default: "/api/placeholder/40/40"
  content: String,     // Comment text
  date: Date,          // Default: Date.now
  likes: Number        // Default: 0
}
```

### Adding New Routes

1. Create a new route file in `src/routes/`
2. Define your Express router and endpoints
3. Import and use in `src/index.js`:

```javascript
const myRoute = require('./routes/myRoute');
app.use('/api/my-endpoint', myRoute);
```

## 🚀 Deployment

### Environment Setup

1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Configure environment variables on your hosting platform
3. Ensure Node.js version compatibility

### Recommended Platforms

- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with automatic deployments
- **DigitalOcean App Platform**: Scalable and reliable
- **AWS Elastic Beanstalk**: Enterprise-grade hosting
- **Render**: Free tier available with auto-deploy

### Deployment Checklist

- [ ] Set `MONGODB_URI` environment variable
- [ ] Set `PORT` environment variable (if required)
- [ ] Configure CORS for production domain
- [ ] Set up MongoDB indexes for performance
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting (recommended)
- [ ] Set up SSL/TLS certificates

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ES6+ features
- Follow consistent indentation (2 spaces)
- Add comments for complex logic
- Use meaningful variable names
- Handle errors appropriately

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or support, please contact:
- **Email**: vilenskyigal@gmail.com
- **Phone**: +491783099433

---

**Built with ❤️ for poetry lovers**