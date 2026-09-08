
````markdown
# 👻 Hush - Anonymous Group Chat

**Hush** is a privacy-focused, real-time anonymous group chat application that requires **no account creation**. Users can create secure rooms, join as unique characters using a PIN, and share messages and files anonymously.

> **Real Conversations. No Identities.**

🚀 **Live Demo:** https://hush-chat.vercel.app

---

## ✨ Key Features

- 🔒 **Complete Anonymity:** No email, phone number, or signup required.
- ⚡ **Real-Time Messaging:** Powered by **Socket.io** for instant communication.
- 🎭 **Character System:** Join groups as an anonymous "Character" protected by a 4-digit PIN.
- 📂 **File Sharing:** Support for image and document uploads up to 30MB.
- 🛡️ **Secure Groups:** Create and join rooms using custom room names.
- 👮 **Admin Panel:** Protected admin route for monitoring groups, messages, and managing content.
- 📱 **Responsive UI:** Clean, modern interface built with React and Vite.
- 🌑 **Modern Dark UI:** Privacy-focused interface with a sleek dark theme.

---

## 🛠️ Tech Stack

### Frontend

- **React.js (Vite)** - Fast and modern UI library.
- **Socket.io Client** - Real-time bidirectional communication.
- **Axios** - HTTP requests and API communication.
- **CSS3** - Custom responsive styling and dark theme.

### Backend

- **Node.js & Express** - REST API and server-side logic.
- **Socket.io** - Real-time WebSocket communication.
- **MongoDB & Mongoose** - Database and data modeling.
- **Multer** - Handling multipart/form-data and file uploads.

---

## 🚀 Repositories

### Frontend

https://github.com/owesh74/Hush

### Backend

https://github.com/owesh74/Guftagu-server

---

## ⚙️ Installation & Setup

Follow these steps to run Hush locally.

### 1. Clone the Repositories

```bash
# Clone Frontend
git clone https://github.com/owesh74/Hush.git

# Clone Backend
git clone https://github.com/owesh74/Guftagu-server.git
````

---

### 2. Backend Setup

Navigate to the server directory:

```bash
cd Guftagu-server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root of the server directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ADMIN_PASSWORD=your_secret_admin_password
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd Hush
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root of the frontend directory:

```env
# For local development
VITE_API_BASE_URL=http://localhost:5000

# For the live backend
# VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

Start the frontend:

```bash
npm run dev
```

The application should now be available at:

```text
http://localhost:5173
```

---

## 📖 Usage Guide

### 1. Create a Room

* Click **Create Room**.
* Enter a unique room name.
* Optionally create your first anonymous character.
* Enter a character name and a 4-digit PIN.
* Create the room and start chatting.

### 2. Join a Room

* Click **Join Room**.
* Enter the room name.
* Choose an existing character or create a new character.
* Enter the required PIN.
* Start chatting anonymously.

### 3. Send Messages & Files

Once inside a room, users can:

* Send real-time text messages.
* Share images.
* Share documents.
* Communicate without revealing their real identity.

### 4. Admin Access

Navigate to:

```text
/admin
```

Enter the administrator password configured in the backend `.env` file to access the admin panel.

---

## ☁️ Deployment

Hush uses the following deployment architecture:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

### Production Environment

The frontend connects to the deployed backend using:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

---

## 🔐 Privacy

Hush is designed around anonymous communication.

Users do not need to provide:

* ❌ Email address
* ❌ Phone number
* ❌ Personal account
* ❌ Real name

Instead, users communicate through anonymous characters inside rooms.

> **No Accounts. No Identities. Just Conversations.**

---

## 🤝 Contributing

Contributions are welcome!

If you would like to improve Hush:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Create a Pull Request.

---

## 👤 Author

**Owesh**

GitHub: [https://github.com/owesh74](https://github.com/owesh74)

---

## ⭐ Support

If you like **Hush**, consider giving the repository a ⭐ on GitHub!

**Hush — Real Conversations. No Identities.**

```

**One important thing:** I used `https://hush-chat.vercel.app` as the live demo based on the domain we discussed. If you actually chose a different Vercel domain, replace that one line.
```
