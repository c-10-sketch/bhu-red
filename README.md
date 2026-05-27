# Browser Verification Platform

Production-ready React + TypeScript frontend and Express + TypeScript backend with MongoDB Atlas settings and JWT admin auth.

## Run locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend API: `http://localhost:4000/api`

## Build for production

```bash
cd frontend
npm run build
```

```bash
cd backend
npm run build
npm start
```

## Environment variables

Copy `.env.example` to backend `.env`:

```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_strong_jwt_secret
ADMIN_USER=TusarKhan
ADMIN_PASSWORD=Wish
```

Optional frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
```
# bhu-red
