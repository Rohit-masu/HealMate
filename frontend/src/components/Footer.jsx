import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate  } from 'react-router-dom'

const Footer = () => {
    const socialLinks = [
        { label: 'GitHub', href: 'https://github.com/Rohit-masu/', icon: <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0 1 12 6.91c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.08.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.07 10.07 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" /> },
        { label: 'Twitter / X', href: 'https://twitter.com/', icon: <path d="M14.4 10.5 21 3h-1.6l-5.7 6.5L9.2 3H4l6.9 9.9L4 21h1.6l6-6.9 4.8 6.9H21l-6.6-10.5Zm-2.1 2.4-.7-1L6 4.2h2.4l4.5 6.3.7 1 5.8 8.2H17l-4.7-6.8Z" /> },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: <path d="M6.9 8.9H3.7V21h3.2V8.9ZM5.3 3C4.2 3 3.5 3.7 3.5 4.7s.7 1.8 1.8 1.8 1.8-.7 1.8-1.8S6.4 3 5.3 3Zm15.2 11.1c0-3.2-1.7-5.3-4.4-5.3-1.7 0-2.8.9-3.3 1.8h-.1V8.9H9.6V21h3.2v-6.7c0-1.8.9-2.8 2.3-2.8 1.3 0 2.1.9 2.1 2.8V21h3.3v-6.9Z" /> },
        { label: 'Instagram', href: 'https://www.instagram.com/', icon: <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8ZM12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" /> },
    ]

    const handleClick = () => {

        navigate('/');
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // For smooth scrolling
          });
    }

    const navigate = useNavigate()
  return (
    <footer className='md:mx-4'>
        <div className='my-10 mt-24 grid gap-12 rounded-[2rem] border border-teal-100 bg-white p-6 text-sm shadow-sm shadow-teal-950/5 lg:grid-cols-[1.6fr_0.8fr_1fr] md:p-10'>
        {/*--------------- Left side ----------------*/}
        <div>

            <img onClick={handleClick} className='mb-5 w-40 cursor-pointer transition-opacity duration-300 hover:opacity-80 ' src={assets.logo} alt="HealMate" />
            <p className='max-w-md leading-6 text-slate-600'>HealMate helps patients discover trusted doctors, book appointments, and keep care organized from the first search to every follow-up visit.</p>

        </div>

        {/*--------------- Center side ----------------*/}
        <div>
            <p className='mb-5 text-lg font-semibold text-slate-900' >COMPANY</p>
            <ul className='flex flex-col gap-2 text-slate-600'>

            <li className="transition hover:text-primary" > <NavLink onClick={()=> window.scrollTo({top: 0, behavior: 'smooth' } )} to='/'> HOME </NavLink></li>
            <li className="transition hover:text-primary" > <NavLink onClick={()=> window.scrollTo({top: 0, behavior: 'smooth' } )} to='/about'> ABOUT US </NavLink></li>
            <li className="transition hover:text-primary" > <NavLink onClick={()=> window.scrollTo({top: 0, behavior: 'smooth' } )} to='/contact'> CONTACT US </NavLink></li>                   
            <li>PRIVACY POLICY</li>

            </ul>
        </div>

        {/*--------------- Right side ----------------*/}
        {/* <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 825-303-8815</li>
            <li>kamriyamayank45@gmail.com</li>
        </ul>
        </div> */}

<div>
    <p className='mb-5 text-lg font-semibold text-slate-900'>GET IN TOUCH</p>
    <ul className='flex flex-col gap-2 text-slate-600'>
        <li>
            <a 
                href="tel:01127571080" 
                className="transition hover:text-primary "
            >
                011-2757 1080
            </a>
            <span className='mx-2 text-teal-200'>/</span>
            <a href="tel:01127572900" className="transition hover:text-primary">011-2757 2900</a>
        </li>
        <li>
            <a 
                href="mailto:bpitindia@yahoo.com?subject=Hello HealMate&body=I would like to get in touch with you." 
                className="transition hover:text-primary "
            >
                bpitindia@yahoo.com
            </a>
        </li>
        <li className='leading-6'>Bhagwan Parshuram Institute of Technology, Rohini, New Delhi</li>
    </ul>
    <div className='mt-5 flex flex-wrap gap-3'>
        {socialLinks.map((link) => (
            <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noreferrer'
                aria-label={link.label}
                className='grid h-10 w-10 place-items-center rounded-full border border-teal-100 bg-teal-50 text-xs font-bold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-white'
            >
                <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current' aria-hidden='true'>
                    {link.icon}
                </svg>
            </a>
        ))}
    </div>
</div>





    </div>
        {/*-----------Copyright Text-----------*/}
        <div>
            <hr className='border-teal-100' />
            <p className='py-5 text-center text-sm text-slate-500'>Copyright 2024 @ HealMate.com - All Rights Reserved.</p>
        </div>

    </footer>
  )
}

export default Footer
