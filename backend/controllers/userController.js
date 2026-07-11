import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createProfilePhoto } from "../utils/avatar.js";

const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const getAuthCookieOptions = (req) => {
    const origin = req.headers.origin || "";
    const isLocalOrigin = localOriginPattern.test(origin);
    const shouldUseSecureCookies = !isLocalOrigin && (
        origin.startsWith("https://") ||
        process.env.NODE_ENV === "production" ||
        Boolean(process.env.RENDER) ||
        Boolean(process.env.RENDER_EXTERNAL_URL)
    );

    return {
        httpOnly: true,
        sameSite: shouldUseSecureCookies ? "none" : "lax",
        secure: shouldUseSecureCookies,
    };
};

const getDuplicateField = (error) => {
    if (error?.code !== 11000) return null;
    return Object.keys(error.keyPattern || error.keyValue || {})[0] || "field";
};

const MAX_PROFILE_PHOTO_LENGTH = 1_500_000;
const profilePhotoPattern = /^data:image\/(png|jpe?g|webp);base64,/i;

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender, profilePhoto } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }
        if (profilePhoto && (!profilePhotoPattern.test(profilePhoto) || profilePhoto.length > MAX_PROFILE_PHOTO_LENGTH)) {
            return res.status(400).json({ message: "Profile photo must be a PNG, JPG, or WebP image under 1MB" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: profilePhoto || createProfilePhoto({ fullName, username, gender }),
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        const duplicateField = getDuplicateField(error);
        if (duplicateField) {
            return res.status(400).json({ message: `${duplicateField} already exists` });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { ...getAuthCookieOptions(req), maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const logout = (req, res) => {
    try {
        return res.status(200).clearCookie("token", getAuthCookieOptions(req)).json({
            message: "Logged out successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
