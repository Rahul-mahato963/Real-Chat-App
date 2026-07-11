import React, {useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (!trimmedMessage || !selectedUser?._id) return;

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {message: trimmedMessage}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            dispatch(setMessages([...(messages || []), res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        } 
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className='border-t border-emerald-100/80 bg-white/85 px-4 py-3 backdrop-blur'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='block w-full rounded-lg border border-slate-200 bg-white py-3 pl-4 pr-12 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400'
                />
                <button type="submit" className='absolute inset-y-1.5 end-1.5 flex w-10 items-center justify-center rounded-lg bg-emerald-500 text-white transition hover:bg-emerald-600' aria-label='Send message'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput
