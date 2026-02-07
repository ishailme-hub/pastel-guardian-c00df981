# ⚙️ Stealth Guard – Setup Guide

This guide explains how to install, configure, and run the **Stealth Guard AI Password Reset Defense System** locally.

Follow step-by-step 👇

---

# 📋 Prerequisites

Make sure you have installed:

- Node.js (v18+)
- npm or yarn
- Python (3.9+)
- pip
- Git

Check versions:

```bash
node -v
npm -v
python --version
pip --version
```

---

# 📦 Clone Repository

```bash
git clone <your-repo-url>
cd stealth-guard
```

---

# 🖥️ Project Structure (example)

```
stealth-guard/
│
├── frontend/        → React / Next dashboard
├── backend/         → Node / API server
├── ml-service/      → Python ML risk scorer
├── README.md
├── SETUP.md
```

---

# 🚀 Step 1 – Setup Frontend

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

App will run at:
```
http://localhost:3000
```

---

# 🚀 Step 2 – Setup Backend API

Open new terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000
REDIS_URL=redis://localhost:6379
SENDGRID_API_KEY=your_key_here
ML_SERVICE_URL=http://localhost:8000
```

Start server:

```bash
npm start
```

Backend runs at:
```
http://localhost:5000
```

---

# 🚀 Step 3 – Setup ML Risk Scoring Service (Python)

Open new terminal:

```bash
cd ml-service
```

Create virtual environment (recommended):

```bash
python -m venv venv
```

Activate:

### Windows
```bash
venv\Scripts\activate
```

### Mac/Linux
```bash
source venv/bin/activate
```

Install packages:

```bash
pip install -r requirements.txt
```

Run service:

```bash
python app.py
```

ML service runs at:
```
http://localhost:8000
```

---

# 🚀 Step 4 – Start Redis (for fingerprint/device velocity)

### Using Docker (recommended)

```bash
docker run -p 6379:6379 redis
```

OR install locally and run:

```bash
redis-server
```

---

# ✅ Final Run Order

Start services in this order:

1. Redis
2. ML service (Python)
3. Backend (Node)
4. Frontend (React)

---

# 🌐 Access Application

| Service | URL |
|---------|-------|
| Frontend Dashboard | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| ML Service | http://localhost:8000 |

---

# 🧪 Test Flow

1. Open dashboard
2. Go to Password Reset
3. Enter email
4. Try multiple requests to simulate bot behavior
5. Observe risk score + AI actions

---

# 🛠️ Common Issues

### Port already in use
Change port in `.env`

### Redis not connecting
Make sure Redis server is running

### Python packages missing
Run:
```bash
pip install -r requirements.txt
```

### Node modules error
Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

---

# 🧠 Notes

- Only low-risk users trigger real email (cost saving)
- High-risk requests show fake success response
- Risk scoring runs in real-time
- Designed for hackathon demo + production-ready architecture

---

# 🎯 You're Ready!

Now open:
```
http://localhost:3000
```

and test **Stealth Guard in action 🛡️**
