import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import MoveUpOnRender from "../../components/MoveUpOnRender.jsx";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      <MoveUpOnRender id="admin-dash">
        <div className="w-full">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Admin dashboard</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-slate-900">HealMate operations overview</h1>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-2xl bg-teal-50 p-3"><img className="w-10" src={assets.doctor_icon} alt="" /></span>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {dashData?.doctors}
                </p>
                <p className="text-sm text-slate-500">Doctors</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-2xl bg-emerald-50 p-3"><img className="w-10" src={assets.appointments_icon} alt="" /></span>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {dashData?.appointments}
                </p>
                <p className="text-sm text-slate-500">Appointments</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-2xl bg-slate-50 p-3"><img className="w-10" src={assets.patients_icon} alt="" /></span>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {dashData?.users}
                </p>
                <p className="text-sm text-slate-500">Patients</p>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm shadow-teal-950/5">
            <div className="flex items-center gap-2.5 border-b border-teal-100 px-5 py-4">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold text-slate-900">Latest Bookings</p>
            </div>

            <div>
              {dashData?.latestAppointments?.map((item, index) => (
                <div
                  className="flex items-center gap-3 border-b border-teal-50 px-5 py-4 transition hover:bg-teal-50/50 last:border-b-0"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item?.docData?.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-slate-800">
                      {item?.docData?.name}
                    </p>
                    <p className="text-slate-500">
                      {slotDateFormat(item?.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
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
          </div>
        </div>
      </MoveUpOnRender>
    )
  );
};

export default Dashboard;
