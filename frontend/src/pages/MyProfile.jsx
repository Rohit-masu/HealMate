import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)
  const [password, setPassword] = useState('')

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      formData.append('bloodGroup', userData.bloodGroup || 'Not selected')
      formData.append('height', userData.height || '')
      formData.append('weight', userData.weight || '')
      if (password) formData.append('password', password)
      if (image) formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          token: token, // instead of utoken
          "Content-Type": "multipart/form-data",
        }        
      })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
        setPassword('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <section className='py-10'>
      <div className='mb-8'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>Patient profile</p>
        <h1 className='font-display mt-3 text-4xl font-bold text-slate-900'>Manage your HealMate details</h1>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-slate-600'>Keep your contact, health basics, and account access updated so appointments stay smooth.</p>
      </div>

      <div className='grid gap-6 lg:grid-cols-[0.75fr_1.25fr]'>
        <div className='rounded-[2rem] border border-teal-100 bg-white p-6 shadow-sm shadow-teal-950/5'>
          {
            isEdit
              ? <label htmlFor="image" className='block cursor-pointer'>
                <div className='relative mx-auto h-36 w-36 overflow-hidden rounded-3xl bg-teal-50'>
                  <img className='h-full w-full object-cover opacity-80' src={image ? URL.createObjectURL(image) : userData.image} alt={userData.name} />
                  {!image && <img className='absolute bottom-12 right-12 w-10 rounded-full bg-white p-2 shadow-lg' src={assets.upload_icon} alt="Upload" />}
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
              : <img className='mx-auto h-36 w-36 rounded-3xl object-cover shadow-lg shadow-teal-950/10' src={userData.image} alt={userData.name} />
          }

          <div className='mt-6 text-center'>
            {
              isEdit
                ? <input className='w-full rounded-xl border border-teal-100 bg-teal-50/50 p-3 text-center text-2xl font-semibold text-slate-900 outline-none focus:border-primary focus:bg-white' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                : <p className='text-3xl font-semibold text-slate-900'>{userData.name}</p>
            }
            <p className='mt-2 break-all text-sm text-primary'>{userData.email}</p>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3 text-center text-xs'>
            <div className='rounded-2xl bg-teal-50 p-4'>
              <p className='font-semibold text-slate-900'>Gender</p>
              <p className='mt-1 text-slate-600'>{userData.gender || 'Not selected'}</p>
            </div>
            <div className='rounded-2xl bg-emerald-50 p-4'>
              <p className='font-semibold text-slate-900'>Birthday</p>
              <p className='mt-1 text-slate-600'>{userData.dob || 'Not selected'}</p>
            </div>
            <div className='rounded-2xl bg-rose-50 p-4'>
              <p className='font-semibold text-slate-900'>Blood Group</p>
              <p className='mt-1 text-slate-600'>{userData.bloodGroup || 'Not selected'}</p>
            </div>
            <div className='rounded-2xl bg-indigo-50 p-4'>
              <p className='font-semibold text-slate-900'>Height / Weight</p>
              <p className='mt-1 text-slate-600'>{userData.height ? `${userData.height} cm` : '--'} / {userData.weight ? `${userData.weight} kg` : '--'}</p>
            </div>
          </div>
        </div>

        <div className='rounded-[2rem] border border-teal-100 bg-white p-6 shadow-sm shadow-teal-950/5 md:p-8'>
          <div className='flex flex-col gap-3 border-b border-teal-100 pb-5 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>Profile information</h2>
              <p className='mt-1 text-sm text-slate-500'>Update details used for appointments and reminders.</p>
            </div>
            {
              isEdit
                ? <button className='rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800' onClick={updateUserProfileData}>Save Information</button>
                : <button className='rounded-full border border-teal-200 px-7 py-3 text-sm font-semibold text-primary transition hover:bg-teal-50' onClick={() => setIsEdit(true)}>Edit Profile</button>
            }
          </div>

          <div className='mt-6 grid gap-5'>
            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
              <p className='font-medium text-slate-700'>Phone</p>
              {
                isEdit
                  ? <input className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' type="text" value={userData.phone || ''} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                  : <p className='text-slate-600'>{userData.phone || 'Not added'}</p>
              }
            </div>

            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-start'>
              <p className='font-medium text-slate-700'>Address</p>
              {
                isEdit
                  ? <div className='grid gap-3'>
                    <input className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address?.line1 || ''} />
                    <input className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address?.line2 || ''} />
                  </div>
                  : <p className='leading-6 text-slate-600'>
                    {userData.address?.line1 || 'Address line 1 not added'}
                    <br />
                    {userData.address?.line2 || 'Address line 2 not added'}
                  </p>
              }
            </div>

            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
              <p className='font-medium text-slate-700'>Gender</p>
              {
                isEdit
                  ? <select className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender || 'Not selected'}>
                    <option value="Not selected">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  : <p className='text-slate-600'>{userData.gender || 'Not selected'}</p>
              }
            </div>

            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
              <p className='font-medium text-slate-700'>Birthday</p>
              {
                isEdit
                  ? <input className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob || ''} />
                  : <p className='text-slate-600'>{userData.dob || 'Not selected'}</p>
              }
            </div>

            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
              <p className='font-medium text-slate-700'>Blood Group</p>
              {
                isEdit
                  ? <select className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' onChange={(e) => setUserData(prev => ({ ...prev, bloodGroup: e.target.value }))} value={userData.bloodGroup || 'Not selected'}>
                    <option value="Not selected">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  : <p className='text-slate-600'>{userData.bloodGroup || 'Not selected'}</p>
              }
            </div>

            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
              <p className='font-medium text-slate-700'>Height (cm)</p>
              {
                isEdit
                  ? <input className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' type='text' placeholder='Height in cm' onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))} value={userData.height || ''} />
                  : <p className='text-slate-600'>{userData.height ? `${userData.height} cm` : 'Not added'}</p>
              }
            </div>

            <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
              <p className='font-medium text-slate-700'>Weight (kg)</p>
              {
                isEdit
                  ? <input className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' type='text' placeholder='Weight in kg' onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))} value={userData.weight || ''} />
                  : <p className='text-slate-600'>{userData.weight ? `${userData.weight} kg` : 'Not added'}</p>
              }
            </div>

            {
              isEdit && (
                <div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center'>
                  <p className='font-medium text-slate-700'>New Password</p>
                  <input 
                    className='rounded-xl border border-teal-100 bg-teal-50/50 p-3 outline-none focus:border-primary focus:bg-white' 
                    type='password' 
                    placeholder='Leave blank to keep current' 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                  />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
