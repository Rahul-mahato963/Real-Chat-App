# Render Deployment

Deploy this repository as two Render services.

## Backend

Create a Render Web Service:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Environment variables:

```env
MONGO_URI=your_rotated_mongodb_connection_string
JWT_SECRET_KEY=your_rotated_jwt_secret
FRONTEND_URL=https://real-chat-app-ke0t.onrender.com
NODE_ENV=production
```

Backend URL:

```txt
https://real-chat-app-backend-gqko.onrender.com
```

## Frontend

Create a Render Static Site:

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `build`

Environment variable:

```env
REACT_APP_API_URL=https://real-chat-app-backend-gqko.onrender.com
```

Frontend URL:

```txt
https://real-chat-app-ke0t.onrender.com
```

After changing environment variables, trigger a manual redeploy for both services.
