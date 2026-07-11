import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";
import ProfileAvatar from './ProfileAvatar';

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image">
                <ProfileAvatar
                    src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    name={message?.senderId === authUser?._id ? authUser?.fullName : selectedUser?.fullName}
                    sizeClass='w-9 h-9'
                    iconClass='w-4 h-4'
                />
            </div>
            <div className="chat-header">
                <time className="text-xs text-slate-400">12:45</time>
            </div>
            <div className={`chat-bubble max-w-xs text-sm shadow-sm ${message?.senderId !== authUser?._id ? 'bg-white/95 text-slate-800' : 'bg-emerald-600 text-white'} `}>{message?.message}</div>
        </div>
    )
}

export default Message
