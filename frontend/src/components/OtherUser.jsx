import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import ProfileAvatar from './ProfileAvatar';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <button
            type='button'
            onClick={() => selectedUserHandler(user)}
            className={`${selectedUser?._id === user?._id ? 'border-emerald-400/50 bg-emerald-400/15 text-white shadow-sm' : 'border-transparent bg-transparent text-slate-300'} flex w-full items-center gap-3 rounded-lg border p-2 text-left transition hover:border-white/10 hover:bg-white/10 hover:text-white`}
        >
                <div className='relative shrink-0'>
                    <ProfileAvatar src={user?.profilePhoto} name={user?.fullName} sizeClass='w-11 h-11' />
                    {
                        isOnline && (
                            <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500'></span>
                        )
                    }
                </div>
                <div className='flex min-w-0 flex-1 flex-col'>
                    <p className='truncate text-sm font-semibold'>{user?.fullName}</p>
                </div>
        </button>
    )
}

export default OtherUser
