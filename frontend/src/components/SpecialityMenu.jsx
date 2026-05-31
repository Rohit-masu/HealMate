import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
      return (
            <section className='flex flex-col items-center gap-4 py-20 text-slate-800' id='speciality'>
                  <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Specialist care</p>
                  <h2 className='font-display text-center text-3xl font-bold sm:text-4xl'>Find the right doctor faster</h2>
                  <p className='max-w-2xl text-center text-sm leading-6 text-slate-600'>Choose a speciality and jump straight to available doctors who match your care needs.</p>
                  <div className='flex w-full gap-4 overflow-scroll pt-6 sm:justify-center'>
                        {
                              specialityData.map((item, index) => (
                                    <Link onClick={() => scrollTo(0, 0)} className='group flex min-w-32 flex-shrink-0 cursor-pointer flex-col items-center gap-3 rounded-2xl border border-teal-100 bg-white px-5 py-5 text-center text-xs shadow-sm shadow-teal-950/5 transition-all duration-300 hover:-translate-y-2 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-950/10' key={index} to={`/doctors/${item.speciality}`}>
                                          <span className='rounded-2xl bg-teal-50 p-4 transition group-hover:bg-emerald-100'>
                                                <img className='h-12 w-12 sm:h-14 sm:w-14' src={item.image} alt={item.speciality} />
                                          </span>
                                          <p className='font-semibold text-slate-700'>{item.speciality}</p>
                                    </Link>
                              ))
                        }
                  </div>
            </section>
      )
}

export default SpecialityMenu
