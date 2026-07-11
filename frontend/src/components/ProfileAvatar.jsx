import React, { useEffect, useMemo, useState } from 'react'
import { FiUser } from "react-icons/fi";

const ProfileAvatar = ({ src, name = "User", online = false, sizeClass = "w-11 h-11", iconClass = "w-5 h-5", className = "" }) => {
    const [hasImageError, setHasImageError] = useState(false);
    const initials = useMemo(() => {
        return (name || "User")
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    }, [name]);

    useEffect(() => {
        setHasImageError(false);
    }, [src]);

    const shouldShowImage = Boolean(src) && !hasImageError;

    return (
        <div className={`avatar ${online ? 'online' : ''} ${className}`} title={name}>
            <div className={`${sizeClass} rounded-full bg-slate-100 ring-2 ring-white shadow-sm overflow-hidden`}>
                {
                    shouldShowImage ? (
                        <img src={src} alt={`${name} profile`} onError={() => setHasImageError(true)} />
                    ) : (
                        <div className='flex h-full w-full items-center justify-center bg-slate-950 text-white'>
                            {
                                initials ? (
                                    <span className='text-sm font-bold'>{initials}</span>
                                ) : (
                                    <FiUser className={iconClass} />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileAvatar
