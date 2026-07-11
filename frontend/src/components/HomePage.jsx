import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiMessageCircle } from "react-icons/fi";
import ProfileAvatar from './ProfileAvatar'

const HomePage = () => {
  const { authUser, onlineUsers, selectedUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className='flex h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-white/70 bg-white/80 shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:h-[calc(100vh-3rem)]'>
      <header className='flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/85 px-4 py-3 sm:px-5'>
        <div className='flex min-w-0 items-center gap-3'>
          <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-lg shadow-slate-950/20'>
            <FiMessageCircle className='h-5 w-5' />
          </div>
          <div className='min-w-0'>
            <p className='text-xs font-semibold uppercase tracking-widest text-emerald-600'>Real Chat</p>
            <h1 className='truncate text-lg font-bold text-slate-950 sm:text-xl'>Messages</h1>
          </div>
        </div>

        <div className='flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-2 py-1.5 shadow-sm'>
          <ProfileAvatar src={authUser?.profilePhoto} name={authUser?.fullName} online={true} sizeClass='w-10 h-10' />
          <div className='hidden min-w-0 sm:block'>
            <p className='truncate text-sm font-semibold text-slate-900'>{authUser?.fullName || "My profile"}</p>
            <p className='text-xs text-slate-500'>{onlineUsers?.length || 0} online now</p>
          </div>
        </div>
      </header>

      <main className='flex min-h-0 flex-1 flex-col md:flex-row'>
        <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} min-h-0 flex-1 md:flex-none`}>
          <Sidebar />
        </div>
        <div className={`${selectedUser ? 'flex' : 'hidden md:flex'} min-h-0 flex-1`}>
          <MessageContainer />
        </div>
      </main>
    </div>
  )
}

export default HomePage
