import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'


const Banner = () => {
    const navigate = useNavigate()
    const { token } = React.useContext(AppContext)

  return (
    <section className='my-20 overflow-hidden rounded-[2rem] border border-teal-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-6 text-slate-900 shadow-xl shadow-teal-950/10 sm:px-10 md:mx-4 md:px-14 lg:px-12'>
    <div className='grid items-center gap-8 md:grid-cols-[1fr_0.85fr]'>
    <div className='py-10 sm:py-12 md:py-16 lg:py-20 lg:pl-5'>
<div className='font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl'>
    <p>Ready for calmer care?</p>
    <p className='mt-3 text-primary'>Start with HealMate today.</p>
</div>
<p className='mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-base'>Create your account to manage bookings, profiles, and upcoming visits in one polished patient dashboard.</p>
{!token && (
  <button onClick={()=>{navigate('/login'); window.scrollTo({top: 0, behavior: 'smooth' }) }} className='mt-7 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 sm:text-base'>Create Account</button>
)}

    </div>

    <div className='hidden h-full items-end justify-center md:flex'>
        <div className='relative'>
          <div className='absolute inset-x-8 bottom-0 h-28 rounded-full bg-emerald-200/60 blur-2xl'></div>
          <img className='relative max-h-[390px] w-full max-w-sm object-contain drop-shadow-2xl' src={assets.appointment_img} alt="HealMate appointment booking" />
        </div>
    
    </div>




    </div>
    </section>
  )
}

export default Banner
