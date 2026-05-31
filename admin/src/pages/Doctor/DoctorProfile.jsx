import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DontorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        name: profileData.name,
        degree: profileData.degree,
        experience: profileData.experience,
        about: profileData.about,
        speciality: profileData.speciality,
        phone: profileData.phone,
      };

      if (password) {
        updateData.password = password;
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setPassword("");
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.message);
    }
  };

  const updateAvailability = async () => {
    try {
      const nextAvailability = !profileData.available;
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: nextAvailability,
        name: profileData.name,
        degree: profileData.degree,
        experience: profileData.experience,
        about: profileData.about,
        speciality: profileData.speciality,
        phone: profileData.phone,
      };

      setProfileData((prev) => ({ ...prev, available: nextAvailability }));
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(nextAvailability ? "You are now available for bookings" : "You are now marked unavailable");
        getProfileData();
      } else {
        toast.error(data.message);
        setProfileData((prev) => ({ ...prev, available: !nextAvailability }));
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.message);
      getProfileData();
    }
  };

  return (
    profileData && (
      <div className="w-full max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Doctor Profile</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-slate-900">Personal Information</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image Card */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white p-4 shadow-sm shadow-teal-950/5">
              <img
                className="aspect-square w-full rounded-xl object-cover bg-emerald-50"
                src={profileData.image}
                alt=""
              />
              <div className="mt-4 flex flex-col items-center text-center">
                <h2 className="text-xl font-bold text-slate-900">{profileData.name}</h2>
                <p className="text-sm font-medium text-emerald-600">{profileData.speciality}</p>
                <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className={`h-2 w-2 rounded-full ${profileData.available ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                  {profileData.available ? 'Available' : 'Unavailable'}
                </div>
                {!isEdit && (
                  <button
                    onClick={updateAvailability}
                    className="mt-4 rounded-full border border-teal-200 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-teal-50"
                  >
                    {profileData.available ? "Mark unavailable" : "Mark available"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="flex-1 space-y-6">
            <div className="rounded-2xl border border-teal-100 bg-white shadow-sm shadow-teal-950/5">
              <div className="flex items-center justify-between border-b border-teal-100 px-6 py-4">
                <h3 className="font-bold text-slate-900 text-lg">General Details</h3>
                {!isEdit ? (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEdit(false)}
                      className="rounded-full bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={updateProfile}
                      className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                    {isEdit ? (
                      <input
                        type="text"
                        className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                        value={profileData.name}
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profileData.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Speciality</label>
                    {isEdit ? (
                      <select
                        className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, speciality: e.target.value }))}
                        value={profileData.speciality}
                      >
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                      </select>
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profileData.speciality}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Education / Degree</label>
                    {isEdit ? (
                      <input
                        type="text"
                        className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, degree: e.target.value }))}
                        value={profileData.degree}
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profileData.degree}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience</label>
                    {isEdit ? (
                      <select
                        className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                        value={profileData.experience}
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profileData.experience}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Appointment Fee</label>
                    {isEdit ? (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm font-bold">{currency}</span>
                        <input
                          type="number"
                          className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                          value={profileData.fees}
                        />
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{currency} {profileData.fees}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Number</label>
                    {isEdit ? (
                      <input
                        type="text"
                        className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        value={profileData.phone}
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">About Doctor</label>
                  {isEdit ? (
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                      value={profileData.about}
                    />
                  ) : (
                    <p className="text-sm leading-relaxed text-slate-600">{profileData.about}</p>
                  )}
                </div>
              </div>
            </div>

            {isEdit && (
              <div className="rounded-2xl border border-teal-100 bg-white shadow-sm shadow-teal-950/5">
                <div className="border-b border-teal-100 px-6 py-4">
                  <h3 className="font-bold text-slate-900 text-lg">Account Settings</h3>
                </div>
                <div className="p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-xl border border-teal-50 bg-teal-50/30 p-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Availability Status</p>
                        <p className="text-xs text-slate-500">Toggle profile visibility before saving</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={profileData.available}
                          onChange={() => setProfileData((prev) => ({ ...prev, available: !prev.available }))}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300"></div>
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Change Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinic Address</label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        className="rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Address Line 1"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                        value={profileData?.address?.line1}
                      />
                      <input
                        type="text"
                        className="rounded-lg border border-teal-100 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Address Line 2"
                        onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                        value={profileData?.address?.line2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
