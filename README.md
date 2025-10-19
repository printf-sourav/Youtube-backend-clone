# 🎬 YouTube Backend Clone

A **production-style YouTube backend API** built with **Node.js, Express, MongoDB, and Cloudinary** — featuring authentication, video uploads, likes, comments, and more.  
This project replicates the core backend functionalities of YouTube, following scalable, modular architecture.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime for backend  
- **Express.js** – Web framework for routing and middleware  
- **MongoDB + Mongoose** – NoSQL database and ODM  
- **Cloudinary** – Video and thumbnail upload & management  
- **JWT Authentication** – Secure login and token refresh  
- **Multer** – File upload handling  
- **Dotenv** – Environment variable management  

---

## 🧩 Folder Structure

```
Youtube-backend-clone/
├── controllers/      → Route logic (auth, videos, users)
├── routes/           → Express routes
├── models/           → Mongoose schemas
├── middleware/       → Auth, error handlers
├── utils/            → Cloudinary & helper functions
├── .env.example      → Example environment config
├── server.js         → Main entry point
└── Youtube-Backend.postman_collection.json → API documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/Youtube-backend-clone.git
cd Youtube-backend-clone
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root and add:

```
PORT=5000
MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

👉 Example file provided: `.env.example`

### 4️⃣ Run the Server
```bash
npm run dev
# or
node server.js
```

Server runs on:
```
http://localhost:5000
```

---

## 📮 API Documentation (Postman)

A complete **Postman collection** is included with all endpoints, sample requests, and saved responses.

**File:**  
`Youtube-Backend.postman_collection.json`

### 📌 To Use:
1. Open Postman → click **Import**
2. Select the file `Youtube-Backend.postman_collection.json`
3. Test endpoints like:
   - Register / Login users  
   - Upload videos  
   - Like / Comment on videos  

You can also view example responses for each API.

---

## 🔗 Example API Endpoints

| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| POST   | `/api/v1/auth/register`      | Register new user           |
| POST   | `/api/v1/auth/login`         | Login and receive JWT token |
| GET    | `/api/v1/users/:id`          | Get user profile            |
| PUT    | `/api/v1/users/:id`          | Update user profile         |
| POST   | `/api/v1/videos/upload`      | Upload video to Cloudinary  |
| GET    | `/api/v1/videos`             | Fetch all videos            |
| POST   | `/api/v1/videos/:id/like`    | Like a video                |
| POST   | `/api/v1/videos/:id/comment` | Add comment on video        |

---

## ☁️ Cloudinary Integration

Cloudinary handles secure storage for videos and thumbnails.

**Config:**  
Set up Cloudinary credentials in `.env` and integrate via `utils/cloudinary.js`.

**Example:**
```js
const { uploader } = require("cloudinary").v2;

const uploadVideo = async (filePath) => {
  const result = await uploader.upload(filePath, {
    resource_type: "video",
    folder: "youtube-clone/videos",
  });
  return result.secure_url;
};
```

---

## 🧠 Future Enhancements

- 🧪 Add Jest/Supertest for route testing  
- 📘 Integrate Swagger UI for live API documentation  
- 🔍 Implement pagination and search features  
- ⚡ Add Redis caching for trending videos  
- 🔔 Real-time notifications using Socket.io  

---

## 👨‍💻 Developer

**Sourav Kumar Sahu**  
Backend Developer | Node.js • Express • MongoDB • Cloud Integration  

📧 [lcs.souravkrsahu@gmail.com](mailto:lcs.souravkrsahu@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/sourav-kumar-sahu-ab7003209/)  


