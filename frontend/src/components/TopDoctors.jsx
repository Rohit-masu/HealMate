import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { doctors as fallbackDoctors } from '../assets/assets';

const TopDoctors = () => {

      const navigate = useNavigate();
      const { doctors } = useContext(AppContext)
      const featuredDoctors = (doctors?.length ? doctors : fallbackDoctors).slice(0, 8)

      return (
            <section className='my-16 flex flex-col items-center gap-5 text-slate-900 sm:mx-4'>
                  <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Available now</p>
                  <h2 className='font-display text-center text-3xl font-bold sm:text-4xl'>Top doctors patients trust</h2>
                  <p className='max-w-xl text-center text-sm leading-6 text-slate-600'>Browse highly rated care providers and book the appointment slot that works for your day.</p>
                  <div className='grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 px-1 pt-6 sm:px-0'>
                        {
                              featuredDoctors.map((item) => (
                                    <div key={item._id} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }} className='group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-950/10'>
                                          <div className='aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50'>
                                                <img className='h-full w-full object-contain transition duration-500 group-hover:scale-105' src={item.image} alt={item.name} />
                                          </div>
                                          <div className='p-5'>
                                                <div className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${item.available !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                      <span className={`h-2 w-2 ${item.available !== false ? 'bg-emerald-500' : 'bg-slate-400'} rounded-full`}></span>
                                                      <span>{item.available !== false ? 'Available today' : 'Not available'}</span>
                                                </div>
                                                <p className='text-lg font-semibold text-slate-900'>{item.name}</p>
                                                <p className='text-sm text-slate-600'>{item.speciality}</p>
                                                <p className='mt-3 text-xs font-medium uppercase tracking-[0.14em] text-teal-700'>Book consultation</p>
                                          </div>
                                    </div>
                              ))}
                  </div>
                  <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='mt-8 rounded-full border border-teal-200 bg-white px-10 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-50'>View all doctors</button>
            </section>
      )
}

export default TopDoctors
