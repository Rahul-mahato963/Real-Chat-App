import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';
import AuthLayout from './AuthLayout';
import { FiArrowRight, FiLock, FiUser } from "react-icons/fi";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <AuthLayout
      title='Welcome back'
      subtitle='Sign in to continue your conversations.'
      footer={<>New here? <Link className='font-semibold text-emerald-600 hover:text-emerald-700' to="/signup">Create an account</Link></>}
    >
      <form onSubmit={onSubmitHandler} action="" className='space-y-5'>

        <div>
          <label className='mb-2 block text-sm font-semibold text-slate-700'>Username</label>
          <div className='relative'>
            <FiUser className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className='input input-bordered h-12 min-w-0 w-full rounded-lg border-slate-200 bg-white pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400'
            type="text"
            placeholder='Enter username'
            autoComplete='username'
            required />
          </div>
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-slate-700'>Password</label>
          <div className='relative'>
            <FiLock className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='input input-bordered h-12 min-w-0 w-full rounded-lg border-slate-200 bg-white pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400'
            type="password"
            placeholder='Enter password'
            autoComplete='current-password'
            required />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className='btn h-12 min-h-0 min-w-0 w-full rounded-lg border-0 bg-slate-950 text-white hover:bg-emerald-600 disabled:opacity-70'
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
          <FiArrowRight className='h-4 w-4' />
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
