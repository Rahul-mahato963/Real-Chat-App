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

Set these in Render's backend Environment tab. Render will not use your local `backend/.env` file after it is removed from Git.

Backend URL:

```txt
https://real-chat-app-backend-gqko.onrender.com
```

Health check:

```txt
https://real-chat-app-backend-gqko.onrender.com/health
```

It should return `"database":"connected"`. If it does not, check the backend `MONGO_URI` value and MongoDB Atlas Network Access. For Atlas, allow Render's outbound IPs or temporarily allow `0.0.0.0/0`.

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

React Router direct links such as `/login` need a Render rewrite rule on the frontend Static Site:

```txt
Action: Rewrite
Source: /*
Destination: /index.html
```

Without this rule, `https://real-chat-app-ke0t.onrender.com/login` returns Render's `404 Not Found` before React loads.

After changing environment variables, trigger a manual redeploy for both services.
