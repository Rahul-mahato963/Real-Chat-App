const defaultAllowedOrigins = [
    "https://real-chat-app-ke0t.onrender.com",
    "http://localhost:3000",
    "http://localhost:3001",
];

const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const parseOriginList = (value = "") => {
    return value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
};

export const getAllowedOrigins = () => {
    const envOrigins = [
        process.env.FRONTEND_URL,
        ...parseOriginList(process.env.CORS_ORIGINS),
    ].filter(Boolean);

    return [...new Set([...defaultAllowedOrigins, ...envOrigins])];
};

export const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    if (localOriginPattern.test(origin)) return true;
    return getAllowedOrigins().includes(origin);
};

export const createCorsOptions = () => ({
    origin(origin, callback) {
        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
});
