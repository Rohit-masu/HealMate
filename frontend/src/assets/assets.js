import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
   
  {
    _id: 'doc1',
    name: 'Dr. Priya Sharma',
    image: doc1,
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '6 Years',
    about: 'Experienced physician specializing in preventive healthcare, diagnosis, and treatment of common medical conditions.',
    fees: 700,
    address: {
      line1: 'Sector 18',
      line2: 'Noida, Uttar Pradesh'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Arjun Verma',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '8 Years',
    about: 'Specialist in women’s health, pregnancy care, and reproductive wellness.',
    fees: 900,
    address: {
      line1: 'Rajouri Garden',
      line2: 'New Delhi, Delhi'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Ananya Patel',
    image: doc3,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '5 Years',
    about: 'Expert in skin, hair, and nail disorders with modern dermatological treatments.',
    fees: 800,
    address: {
      line1: 'Satellite Road',
      line2: 'Ahmedabad, Gujarat'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Rahul Singh',
    image: doc4,
    speciality: 'Pediatricians',
    degree: 'MBBS, DCH',
    experience: '7 Years',
    about: 'Dedicated pediatrician focused on child health, growth, and vaccinations.',
    fees: 750,
    address: {
      line1: 'Indirapuram',
      line2: 'Ghaziabad, Uttar Pradesh'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Sneha Reddy',
    image: doc5,
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '9 Years',
    about: 'Specializes in treating neurological disorders including migraines and epilepsy.',
    fees: 1200,
    address: {
      line1: 'Banjara Hills',
      line2: 'Hyderabad, Telangana'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Vikram Mehta',
    image: doc6,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '10 Years',
    about: 'Expert in digestive system disorders, liver diseases, and gastrointestinal care.',
    fees: 1300,
    address: {
      line1: 'Civil Lines',
      line2: 'Jaipur, Rajasthan'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Kavya Iyer',
    image: doc7,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Provides primary healthcare services with emphasis on early diagnosis and prevention.',
    fees: 600,
    address: {
      line1: 'Anna Nagar',
      line2: 'Chennai, Tamil Nadu'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Rohan Kapoor',
    image: doc8,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '6 Years',
    about: 'Experienced in women’s healthcare and prenatal care management.',
    fees: 850,
    address: {
      line1: 'Model Town',
      line2: 'Ludhiana, Punjab'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Neha Joshi',
    image: doc9,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '7 Years',
    about: 'Offers advanced treatment for acne, pigmentation, and cosmetic skin concerns.',
    fees: 900,
    address: {
      line1: 'Kothrud',
      line2: 'Pune, Maharashtra'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Aditya Nair',
    image: doc10,
    speciality: 'Pediatricians',
    degree: 'MBBS, DNB',
    experience: '5 Years',
    about: 'Passionate about pediatric healthcare and developmental monitoring of children.',
    fees: 700,
    address: {
      line1: 'MG Road',
      line2: 'Kochi, Kerala'
    }
  },
]