import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';
import AuthLayout from './AuthLayout';
import { FiArrowRight, FiAtSign, FiCamera, FiLock, FiTrash2, FiUser } from "react-icons/fi";

const MAX_PROFILE_PHOTO_SIZE = 1024 * 1024;

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePhoto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const profileInitials = (user.fullName || user.username || "U")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleProfilePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_PROFILE_PHOTO_SIZE) {
      toast.error("Profile photo must be under 1MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUser((currentUser) => ({ ...currentUser, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  const removeProfilePhoto = () => {
    setUser({ ...user, profilePhoto: "" });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
      profilePhoto: "",
    })
  }
  return (
    <AuthLayout
      title='Sign up'
      subtitle='Create your Real Chat profile.'
      footer={<>Already have an account? <Link className='font-semibold text-emerald-600 hover:text-emerald-700' to="/login">Login</Link></>}
    >
        <form onSubmit={onSubmitHandler} action="" className='space-y-4'>
          <div className='flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3'>
            <div className='h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-950 text-white ring-2 ring-white shadow-sm'>
              {
                user.profilePhoto ? (
                  <img src={user.profilePhoto} alt='Profile preview' className='h-full w-full object-cover' />
                ) : (
                  <div className='flex h-full w-full items-center justify-center text-lg font-bold'>
                    {profileInitials}
                  </div>
                )
              }
            </div>
            <div className='min-w-0 flex-1'>
              <label htmlFor='profilePhoto' className='btn h-10 min-h-0 rounded-lg border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'>
                <FiCamera className='h-4 w-4' />
                Photo
              </label>
              <input id='profilePhoto' type='file' accept='image/png,image/jpeg,image/webp' onChange={handleProfilePhoto} className='hidden' />
              <p className='mt-1 text-xs text-slate-500'>PNG, JPG, or WebP under 1MB</p>
            </div>
            {
              user.profilePhoto && (
                <button type='button' onClick={removeProfilePhoto} className='btn btn-ghost h-10 min-h-0 w-10 rounded-lg p-0 text-slate-500 hover:bg-rose-50 hover:text-rose-600' aria-label='Remove profile photo'>
                  <FiTrash2 className='h-4 w-4' />
                </button>
              )
            }
          </div>

          <div>
            <label className='mb-2 block text-sm font-semibold text-slate-700'>Full name</label>
            <div className='relative'>
              <FiUser className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='input input-bordered h-12 min-w-0 w-full rounded-lg border-slate-200 bg-white pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400'
              type="text"
              placeholder='Enter full name'
              autoComplete='name'
              required />
            </div>
          </div>
          <div>
            <label className='mb-2 block text-sm font-semibold text-slate-700'>Username</label>
            <div className='relative'>
              <FiAtSign className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='input input-bordered h-12 min-w-0 w-full rounded-lg border-slate-200 bg-white pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400'
              type="text"
              placeholder='Choose username'
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
              placeholder='Create password'
              autoComplete='new-password'
              required />
            </div>
          </div>
          <div>
            <label className='mb-2 block text-sm font-semibold text-slate-700'>Confirm password</label>
            <div className='relative'>
              <FiLock className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='input input-bordered h-12 min-w-0 w-full rounded-lg border-slate-200 bg-white pl-11 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-400'
              type="password"
              placeholder='Confirm password'
              autoComplete='new-password'
              required />
            </div>
          </div>
          <div>
            <label className='mb-2 block text-sm font-semibold text-slate-700'>Gender</label>
            <div className='grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1'>
              <button
                type='button'
                onClick={() => handleCheckbox("male")}
                className={`${user.gender === "male" ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-white'} h-10 rounded-md text-sm font-semibold transition`}
              >
                Male
              </button>
              <button
                type='button'
                onClick={() => handleCheckbox("female")}
                className={`${user.gender === "female" ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-600 hover:bg-white'} h-10 rounded-md text-sm font-semibold transition`}
              >
                Female
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn h-12 min-h-0 min-w-0 w-full rounded-lg border-0 bg-slate-950 text-white hover:bg-emerald-600 disabled:opacity-70'
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
            <FiArrowRight className='h-4 w-4' />
          </button>
        </form>
    </AuthLayout>
  )
}

export default Signup
