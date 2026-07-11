import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector } from "react-redux";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import ProfileAvatar from './ProfileAvatar';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);

    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='chat-panel-bg flex min-h-0 flex-1 flex-col'>
                        <div className='flex items-center gap-3 border-b border-emerald-100/80 bg-white/85 px-4 py-3 backdrop-blur'>
                            <ProfileAvatar src={selectedUser?.profilePhoto} name={selectedUser?.fullName} online={isOnline} sizeClass='w-11 h-11' />
                            <div className='min-w-0 flex-1'>
                                <p className='truncate text-sm font-bold text-slate-950'>{selectedUser?.fullName}</p>
                                <p className={`${isOnline ? 'text-emerald-600' : 'text-slate-400'} text-xs`}>{isOnline ? 'Active now' : 'Away'}</p>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='chat-panel-bg flex min-h-[22rem] flex-1 flex-col items-center justify-center px-6 py-10 text-center'>
                        <div className='mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shadow-sm'>
                            <FiMessageSquare className='h-7 w-7' />
                        </div>
                        <h2 className='max-w-md text-2xl font-bold text-slate-950'>Hi, {authUser?.fullName || "there"}</h2>
                        <p className='mt-2 max-w-sm text-sm leading-6 text-slate-500'>Choose a conversation from the sidebar and your messages will appear here.</p>
                        <div className='mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm'>
                            <FiUsers className='h-4 w-4 text-emerald-600' />
                            Ready for real-time chat
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default MessageContainer
