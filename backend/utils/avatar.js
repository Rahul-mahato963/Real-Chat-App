const avatarColors = [
    ["#0f172a", "#34d399"],
    ["#1e293b", "#60a5fa"],
    ["#312e81", "#f472b6"],
    ["#064e3b", "#a7f3d0"],
    ["#7c2d12", "#fdba74"],
];

const escapeSvgText = (value = "") => {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
};

const getInitials = (fullName = "", username = "") => {
    const source = fullName.trim() || username.trim() || "User";
    return source
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
};

const getColorPair = (seed = "") => {
    const total = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return avatarColors[total % avatarColors.length];
};

export const createProfilePhoto = ({ fullName, username, gender }) => {
    const initials = escapeSvgText(getInitials(fullName, username));
    const [background, accent] = getColorPair(username || fullName || gender);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
            <rect width="160" height="160" rx="80" fill="${background}"/>
            <circle cx="124" cy="36" r="26" fill="${accent}" opacity="0.9"/>
            <circle cx="42" cy="126" r="34" fill="${accent}" opacity="0.2"/>
            <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${initials}</text>
        </svg>
    `.trim();

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
