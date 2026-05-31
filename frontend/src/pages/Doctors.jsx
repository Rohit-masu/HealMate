
import React, { useEffect,useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors as fallbackDoctors } from '../assets/assets'
// import Loader from '../components/Loader.jsx'

const Doctor = () => {
  const {speciality} = useParams()
  const [filterDoc, setFilterDoc ]= useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const {doctors} = useContext(AppContext)
  const doctorList = doctors.length ? doctors : fallbackDoctors

  const applyFilter =()=>{
  if (doctorList.length>0){
    if(speciality){
      setFilterDoc(doctorList.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctorList)
    }
  }
}


useEffect(() => {
  if (doctorList.length > 0) {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }
}, [doctorList.length]);


  useEffect(()=>{
    applyFilter()
  },[doctors,speciality]
)
      
  return (
  <div className='py-8'>
    <div className='mb-8'>
      <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>All doctors</p>
      <h1 className='font-display mt-3 text-4xl font-bold text-slate-900'>Browse by speciality</h1>
      <p className='mt-3 max-w-2xl text-sm leading-6 text-slate-600'>Filter HealMate doctors by care category and book a consultation with the right specialist.</p>
    </div>
    <div className='flex flex-col items-start gap-6 sm:flex-row'>
      <div className='flex w-full flex-col gap-3 rounded-2xl border border-teal-100 bg-white p-4 text-sm text-slate-600 shadow-sm shadow-teal-950/5 sm:w-64 sm:flex-shrink-0'>
        <p onClick={()=>{ if( speciality != 'General physician') {navigate('/doctors/General physician')  }}} className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${speciality === "General physician" ? "border-primary bg-teal-50 text-primary" : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"  }  `} >General physician</p>
        <p onClick={()=>{ if( speciality != 'Pediatricians'){ navigate('/doctors/Pediatricians')  }}} className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${speciality === "Pediatricians" ? "border-primary bg-teal-50 text-primary" : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"  }  `} >Pediatricians</p>
        <p onClick={()=>{ if( speciality != 'Gynecologist') {navigate('/doctors/Gynecologist')  }}} className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${speciality === "Gynecologist" ? "border-primary bg-teal-50 text-primary" : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"  }  `} >Gynecologist</p>
        <p onClick={()=>{ if( speciality != 'Dermatologist') {navigate('/doctors/Dermatologist')  }}} className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${speciality === "Dermatologist" ? "border-primary bg-teal-50 text-primary" : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"  }  `} >Dermatologist</p>
        <p onClick={()=>{ if( speciality != 'Neurologist') {navigate('/doctors/Neurologist')  }}} className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${speciality === "Neurologist" ? "border-primary bg-teal-50 text-primary" : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"  }  `} >Neurologist</p>
        <p onClick={()=>{ if( speciality != 'Gastroenterologist') {navigate('/doctors/Gastroenterologist')  }}} className={`cursor-pointer rounded-xl border px-4 py-3 transition-all ${speciality === "Gastroenterologist" ? "border-primary bg-teal-50 text-primary" : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"  }  `} >Gastroenterologist</p>
      </div>
    
{
  loading ? ( // Show loader while loading
    <div className="flex justify-center items-center h-96 w-full ">
      {/* <Loader /> */}
    </div>
  ) : (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filterDoc.map((item, index) => (
        <div
          onClick={() => navigate(`/my-appointment/${item._id}`)}
          className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-950/10"
          key={index}
        >
          <div className='aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50'>
            <img className="h-full w-full object-contain transition duration-500 group-hover:scale-105" src={item.image} alt={item.name} />
          </div>
          <div className="p-5">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                item.available !== false ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              <span
                className={`h-2 w-2 ${
                  item.available !== false ? "bg-emerald-500" : "bg-slate-400"
                } rounded-full`}
              ></span>
              <span>{item.available !== false ? "Available today" : "Not available"}</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{item.name}</p>
            <p className="text-sm text-slate-600">{item.speciality}</p>
            <p className='mt-3 text-xs font-medium uppercase tracking-[0.14em] text-teal-700'>View appointment</p>
          </div>
        </div>
      ))}
    </div>
  )
}


    </div>

  </div>
  )
}

export default Doctor
