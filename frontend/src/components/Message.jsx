import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";
import ProfileAvatar from './ProfileAvatar';

const getId = (value) => {
    if (!value) return "";
    if (typeof value === "object") return String(value._id || value.id || "");
    return String(value);
};

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);
    const isOwnMessage = getId(message?.senderId) === getId(authUser?._id);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    return (
        <div ref={scroll} className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image">
                <ProfileAvatar
                    src={isOwnMessage ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    name={isOwnMessage ? authUser?.fullName : selectedUser?.fullName}
                    sizeClass='w-9 h-9'
                    iconClass='w-4 h-4'
                />
            </div>
            <div className="chat-header">
                <time className="text-xs text-slate-400">12:45</time>
            </div>
            <div className={`chat-bubble max-w-xs text-sm shadow-sm ${isOwnMessage ? 'bg-emerald-600 text-white' : 'bg-white/95 text-slate-800'} `}>{message?.message}</div>
        </div>
    )
}

export default Message
