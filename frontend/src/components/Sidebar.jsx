import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { FiLogOut, FiRefreshCcw } from "react-icons/fi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const clearSession = () => {
        dispatch(setAuthUser(null));
        dispatch(setMessages(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
        navigate("/login");
    }

    const logoutHandler = async () => {
        if(isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`, {
                withCredentials: true
            });
            toast.success(res.data.message || "Logged out successfully.");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Could not reach server. Logged out locally.");
        } finally {
            clearSession();
            setIsLoggingOut(false);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(!search.trim()){
            return;
        }
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <aside className='flex h-72 shrink-0 flex-col border-b border-slate-800/80 bg-slate-950 p-4 text-white md:h-full md:w-80 md:border-b-0 md:border-r'>
            <div className='mb-4 flex items-center justify-between gap-3'>
                <div>
                    <h2 className='text-base font-bold text-white'>Chats</h2>
                    <p className='text-xs text-slate-400'>Find people and start talking</p>
                </div>
                <button
                    type='button'
                    onClick={() => {
                        setSearch("");
                        dispatch(setOtherUsers(null));
                    }}
                    className='btn btn-ghost btn-sm h-9 w-9 rounded-lg p-0 text-slate-400 hover:bg-white/10 hover:text-white'
                    aria-label='Reset search'
                    title='Reset search'
                >
                    <FiRefreshCcw className='h-4 w-4' />
                </button>
            </div>

            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered h-11 min-w-0 flex-1 rounded-lg border-white/10 bg-white/10 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none' type="text"
                    placeholder='Search people'
                />
                <button type='submit' className='btn h-11 min-h-0 w-11 rounded-lg border-0 bg-emerald-500 p-0 text-white hover:bg-emerald-400' aria-label='Search'>
                    <BiSearchAlt2 className='w-5 h-5 outline-none'/>
                </button>
            </form>
            <div className="my-4 h-px bg-white/10"></div> 
            <OtherUsers/> 
            <div className='mt-4 border-t border-white/10 pt-4'>
                <button
                    type='button'
                    onClick={logoutHandler}
                    disabled={isLoggingOut}
                    className='btn btn-sm min-h-0 h-10 w-full rounded-lg border-white/10 bg-white/10 text-slate-100 hover:border-rose-400/40 hover:bg-rose-500/15 hover:text-rose-100 disabled:opacity-70'
                >
                    <FiLogOut className='h-4 w-4' />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
