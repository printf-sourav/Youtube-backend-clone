# 🎬 YouTube Backend Clone

A **production-ready YouTube backend clone** built using **Node.js, Express.js, MongoDB, JWT**, and **Cloudinary**.  
Implements secure authentication, video uploads, likes/comments, and a modular MVC architecture.  
Includes a complete **Postman API collection with saved responses** for easy testing and documentation.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure user registration, login, and protected routes  
- ☁️ **Cloudinary Integration** – Video and thumbnail uploads stored in the cloud  
- 🎥 **Multer Middleware** – File upload handling and validation  
- 👤 **User Management** – Profile creation, update, and access control  
- ❤️ **Like & Comment System** – Content interaction endpoints  
- 🧩 **MVC Architecture** – Clean separation of logic, models, and routes  
- ⚙️ **Environment Configuration** – `.env` and `.env.example` support  
- 📬 **Postman Collection** – Ready-to-import API documentation with example responses  

---

## 🗂️ Project Structure

Youtube-backend-clone/
├── controllers/ # Request logic (Auth, Video, User, Comment)
├── models/ # MongoDB Schemas (User, Video, Comment)
├── routes/ # Express route definitions
├── middleware/ # Auth, error handling, validation middleware
├── utils/ # Helper utilities (Cloudinary, JWT, tokens, etc.)
├── Youtube-Backend.postman_collection.json # API documentation
├── .env.example # Environment variable template
├── server.js # App entry point
└── package.json


---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JWT (Access + Refresh tokens) |
| File Uploads | Multer |
| Cloud Storage | Cloudinary |
| Configuration | dotenv |
| API Testing | Postman |
| Deployment | Render / Railway / Vercel + MongoDB Atlas |

---

## 🧰 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/Youtube-backend-clone.git
cd Youtube-backend-clone

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

PORT=5000
MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

👉 Example file provided: .env.example

4️⃣ Run the Server

npm run dev
or
node server.js

Server runs on:
http://localhost:5000



📮 API Documentation (Postman)

A complete Postman API collection is provided in the repository.
You can import and test all endpoints, including authentication, videos, comments, and likes.

File:
Youtube-Backend.postman_collection.json

📌 To Use:

Open Postman → click Import.

Select Youtube-Backend.postman_collection.json.

Run any endpoint (register/login/upload video, etc.).

View saved example responses for each API.

🔗 Example API Endpoints

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| POST   | `/api/v1/auth/register`      | Register new user           |
| POST   | `/api/v1/auth/login`         | Login and receive JWT token |
| GET    | `/api/v1/users/:id`          | Get user profile            |
| PUT    | `/api/v1/users/:id`          | Update user profile         |
| POST   | `/api/v1/videos/upload`      | Upload video to Cloudinary  |
| GET    | `/api/v1/videos`             | Fetch all videos            |
| POST   | `/api/v1/videos/:id/like`    | Like a video                |
| POST   | `/api/v1/videos/:id/comment` | Add comment on video        |

🧩 Cloudinary Integration

Your app integrates with Cloudinary to handle video and thumbnail uploads.

Configured via utils/cloudinary.js or similar helper file.

Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.

Files are uploaded and stored securely with public URLs.

const { uploader } = require("cloudinary").v2;

const uploadVideo = async (filePath) => {
  const result = await uploader.upload(filePath, {
    resource_type: "video",
    folder: "youtube-clone/videos",
  });
  return result.secure_url;
};

🧠 Future Enhancements

🧪 Add Jest/Supertest for route testing

📘 Integrate Swagger UI for live API documentation

🧩 Add pagination and search features

📦 Use Redis caching for trending videos

🔔 Add real-time notifications (Socket.io)

Sourav Kumar Sahu
Backend Developer | Node.js • Express • MongoDB • Cloud Integration
📧[lcs.souravkrsahu@gmail.com]
🌐[linkedin](https://www.linkedin.com/in/sourav-kumar-sahu-ab7003209/)

