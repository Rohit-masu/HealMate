import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
      return (
            <div className='relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-600 px-6 shadow-2xl shadow-teal-950/20 md:px-10 lg:px-16'>
                  <div className='absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.13)_0,rgba(255,255,255,0)_46%),radial-gradient(circle_at_88%_18%,rgba(167,243,208,0.42),transparent_28%)]'></div>
                  <div className='grid min-h-[560px] items-center gap-8 md:grid-cols-[1.05fr_0.95fr]'>
                        <div className='flex flex-col items-start gap-6 py-12 md:py-16'>
                              <p className='rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100'>HealMate care network</p>
                              <h1 className='font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl'>Book trusted doctors without the waiting-room stress</h1>
                              <p className='max-w-xl text-base leading-7 text-emerald-50/90'>Find verified specialists, compare availability, and schedule care in a few calm clicks. HealMate keeps appointments simple for patients and organized for clinics.</p>
                              <div className='flex flex-col gap-3 text-sm text-white sm:flex-row sm:items-center'>
                                    <img className='w-28 rounded-full border border-white/30 bg-white/15 p-1' src={assets.group_profiles} alt="Patient community" />
                                    <p><span className='font-semibold'>2,000+ happy patients</span><br className='hidden sm:block' /> connected with dependable doctors.</p>
                              </div>
                              <a href="#speciality" className='group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal-900 shadow-xl shadow-teal-950/20 transition duration-300 hover:-translate-y-1'>
                                    Explore Specialities <img className='w-3 transition group-hover:translate-x-1' src={assets.arrow_icon} alt="" />
                              </a>
                        </div>

                        <div className='relative flex h-full items-end justify-center'>
                              <div className='absolute bottom-8 left-0 hidden rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-white shadow-xl backdrop-blur md:block'>
                                    <p className='text-2xl font-bold'>24/7</p>
                                    <p className='text-xs uppercase tracking-[0.16em] text-emerald-100'>care access</p>
                              </div>
                              <img className='w-full max-w-[520px] self-end drop-shadow-2xl' src={assets.header_img} alt="HealMate doctor consultation" />
                        </div>
                  </div>
            </div>
      )
}

export default Header
