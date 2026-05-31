import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [showSupport, setShowSupport] = useState(false)
  const [message, setMessage] = useState('')
  const supportRef = useRef(null)

  const openSupport = () => {
    setShowSupport(true)
    setTimeout(() => supportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  const sendSupportEmail = () => {
    const body = encodeURIComponent(message || 'Hello HealMate team, I would like to share feedback/support request.')
    window.location.href = `mailto:bpitindia@yahoo.com?subject=HealMate Support Request&body=${body}`
  }

  return (
    <div className='pb-8'>
      <div className='mx-auto max-w-3xl pt-10 text-center'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Contact HealMate</p>
        <h1 className='font-display mt-3 text-4xl font-bold text-slate-900'>Let us help with your care journey</h1>
        <p className='mt-4 text-sm leading-6 text-slate-600'>Reach our campus health desk for appointments, support, collaborations, or feedback about the HealMate experience.</p>
      </div>

      <div className='my-12 grid gap-10 rounded-[2rem] border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 md:grid-cols-[0.9fr_1.1fr] md:p-8'>
        <img className='h-full min-h-[320px] w-full rounded-[1.5rem] object-cover' src={assets.contact_image} alt="HealMate support team" />
        <div className='flex flex-col justify-center gap-6 text-sm'>
          <div>
            <p className='text-lg font-semibold text-slate-900'>Campus Health Desk</p>
            <p className='mt-2 leading-6 text-slate-600'>HealMate Care Center, Admin Block<br />Bhagwan Parshuram Institute of Technology<br />PSP-4, Dr. K.N. Katju Marg, Sector-17, Rohini, New Delhi - 110089</p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-2xl bg-teal-50 p-4'>
              <p className='font-semibold text-slate-900'>Phone</p>
              <a className='mt-1 block text-primary' href='tel:01127571080'>011-2757 1080</a>
              <a className='mt-1 block text-primary' href='tel:01127572900'>011-2757 2900</a>
            </div>
            <div className='rounded-2xl bg-emerald-50 p-4'>
              <p className='font-semibold text-slate-900'>Email</p>
              <a className='mt-1 block text-primary' href='mailto:bpitindia@yahoo.com'>bpitindia@yahoo.com</a>
            </div>
          </div>

          <div className='rounded-2xl border border-teal-100 p-5'>
            <p className='font-semibold text-slate-900'>Student health support</p>
            <p className='mt-2 leading-6 text-slate-600'>For appointment queries, medical camp coordination, or onboarding college doctors, our support desk responds Monday to Saturday, 9:00 AM to 6:00 PM.</p>
          </div>

          <button onClick={openSupport} className='w-fit rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800'>Write to Support</button>
        </div>
      </div>

      {showSupport && (
        <div ref={supportRef} className='mb-16 rounded-[2rem] border border-teal-100 bg-white p-6 shadow-sm shadow-teal-950/5 md:p-8'>
          <p className='text-lg font-semibold text-slate-900'>Send a support note</p>
          <p className='mt-2 text-sm leading-6 text-slate-600'>Share your issue or review. We will open your email app addressed to the BPIT HealMate admin desk.</p>
          <textarea
            className='mt-5 min-h-36 w-full rounded-2xl border border-teal-100 bg-teal-50/40 p-4 text-sm outline-none transition focus:border-primary focus:bg-white'
            placeholder='Write your review or support request...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendSupportEmail} className='mt-4 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800'>Send Email</button>
        </div>
      )}
    </div>
  )
}

export default Contact
