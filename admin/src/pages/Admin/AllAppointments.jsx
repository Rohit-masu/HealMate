import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import MoveUpOnRender from "../../components/MoveUpOnRender";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { currency, calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-7xl">
      <MoveUpOnRender id="admin-allappointment">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Schedule</p>
        <h1 className="font-display mb-5 mt-2 text-3xl font-bold text-slate-900">All Appointments</h1>
        <div className="max-h-[80vh] min-h-[60vh] overflow-y-scroll rounded-2xl border border-teal-100 bg-white text-sm shadow-sm shadow-teal-950/5">
          <div className="hidden grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center border-b border-teal-100 px-6 py-3 font-semibold text-slate-700 sm:grid">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          {appointments.map((item, index) => (
            <div
              className="flex flex-warp items-center justify-between border-b border-teal-50 px-6 py-3 text-slate-500 transition hover:bg-teal-50/50 max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center">
                <img
                  className="w-8 rounded-full"
                  src={item?.userData?.image}
                  alt=""
                />
                <p className="capitalize">{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)} , {item.slotTime}
              </p>
              <div className="flex items-center">
                <img
                  className="w-8 rounded-full bg-gray-200"
                  src={item?.docData?.image}
                  alt=""
                />
                <p>{item?.docData?.name}</p>
              </div>
              <p>
                {currency}
                {item?.docData?.fees}
              </p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </MoveUpOnRender>
    </div>
  );
};

export default AllAppointments;
