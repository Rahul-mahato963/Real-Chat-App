import React from 'react'
import { FiMessageCircle } from "react-icons/fi";

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className='grid min-w-0 w-[calc(100vw-1.5rem)] max-w-5xl overflow-hidden rounded-lg border border-white/70 bg-white/85 shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:w-full lg:grid-cols-[0.95fr_1.05fr]'>
      <section className='hidden min-h-[38rem] flex-col justify-between bg-slate-950 p-8 text-white lg:flex'>
        <div className='flex items-center gap-3'>
          <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'>
            <FiMessageCircle className='h-5 w-5' />
          </div>
          <div>
            <p className='text-xs font-semibold uppercase tracking-widest text-emerald-300'>Real Chat</p>
            <h2 className='text-xl font-bold'>Stay close</h2>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='max-w-sm rounded-lg bg-white/10 p-4 shadow-xl shadow-black/20 ring-1 ring-white/10'>
            <p className='text-sm font-semibold text-white'>Alex</p>
            <p className='mt-2 text-sm leading-6 text-slate-300'>Are you online? I just sent the project notes.</p>
          </div>
          <div className='ml-auto max-w-sm rounded-lg bg-emerald-400 p-4 text-slate-950 shadow-xl shadow-emerald-950/20'>
            <p className='text-sm font-semibold'>You</p>
            <p className='mt-2 text-sm leading-6'>Yep, checking them now.</p>
          </div>
          <div className='max-w-xs rounded-lg bg-white/10 p-4 shadow-xl shadow-black/20 ring-1 ring-white/10'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-emerald-300'></span>
              <p className='text-sm text-slate-300'>3 people active now</p>
            </div>
          </div>
        </div>

        <p className='max-w-sm text-sm leading-6 text-slate-400'>Simple, focused messaging with your profile ready at the top.</p>
      </section>

      <section className='min-w-0 px-4 py-8 sm:px-8 lg:px-10'>
        <div className='mx-auto min-w-0 w-full max-w-md'>
          <div className='mb-8 flex items-center gap-3 lg:hidden'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white'>
              <FiMessageCircle className='h-5 w-5' />
            </div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-widest text-emerald-600'>Real Chat</p>
              <p className='font-bold text-slate-950'>Messages</p>
            </div>
          </div>

          <div className='mb-7'>
            <h1 className='text-3xl font-bold text-slate-950'>{title}</h1>
            <p className='mt-2 text-sm leading-6 text-slate-500'>{subtitle}</p>
          </div>

          {children}

          <div className='mt-6 text-center text-sm text-slate-500'>
            {footer}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AuthLayout
