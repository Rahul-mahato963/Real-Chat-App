💬 Real-Time Chat Application (MERN Stack)

A full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for instant messaging and live communication.
This project demonstrates how modern chat systems like WhatsApp/Discord work under the hood.

🔗 Live Demo: https://real-chat-app-ke0t.onrender.com/login

🚀 Features
🔐 User authentication (Login / Signup)
💬 Real-time one-to-one messaging using Socket.IO
🟢 Online / Offline user status
⚡ Instant message delivery without page refresh
🧠 Persistent chat storage in MongoDB
📱 Responsive UI (mobile + desktop friendly)
🔄 Secure API integration between frontend & backend
🌐 Deployed on Render (Full stack deployment)
🛠️ Tech Stack

Frontend:

React.js
Context API / Hooks
CSS / Tailwind (if used)

Backend:

Node.js
Express.js
Socket.IO

Database:

MongoDB (Mongoose)

Deployment:

Render (Frontend + Backend hosting)
📁 Project Structure
client/        # React frontend
server/        # Node + Express backend
models/        # MongoDB schemas
routes/        # API routes
controllers/   # Logic handlers
socket/        # Socket.IO configuration
⚙️ Installation (Run Locally)
1. Clone the repo
git clone https://github.com/Rahul-mahato963/Real-Chat-App.git
2. Install dependencies

Backend:

cd server
npm install

Frontend:

cd client
npm install
3. Setup environment variables

Create .env in backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
4. Run the project

Backend:

npm start

Frontend:

npm start
🔌 Real-Time Communication

This project uses Socket.IO to enable real-time communication between users.

When a user sends a message → it is emitted to server
Server broadcasts it instantly to the receiver
No need to refresh the page
📸 UI Preview

Login Page:

👉 Modern login UI with username & password authentication
👉 Clean gradient background with centered login card

📌 Key Learning Outcomes
How WebSockets (Socket.IO) works in real applications
How MERN stack integrates frontend + backend + database
Real-time event handling and broadcasting
Authentication flow using JWT
Deployment of full-stack apps on cloud platforms

📈 Future Improvements
Group chat functionality
Typing indicators
File/image sharing
Read receipts
Message encryption

👨‍💻 Author
Rahul Kumar Mahato
Built as a learning + portfolio project for full-stack development.
