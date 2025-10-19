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

