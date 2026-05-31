import { useContext, useEffect, useMemo, useState } from "react";
import { DoctorContext } from "../../context/DontorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const latestAppointments = dashData?.latestAppointments || [];

  const appointmentStats = useMemo(() => {
    const cancelled = latestAppointments.filter((item) => item.cancelled).length;
    const completed = latestAppointments.filter((item) => item.isCompleted).length;
    const pending = latestAppointments.length - cancelled - completed;
    return { cancelled, completed, pending };
  }, [latestAppointments]);

  const filteredAppointments = latestAppointments.filter((item) => {
    if (statusFilter === "Pending") return !item.cancelled && !item.isCompleted;
    if (statusFilter === "Completed") return item.isCompleted;
    if (statusFilter === "Cancelled") return item.cancelled;
    return true;
  });

  const handleComplete = async (appointmentId) => {
    await completeAppointment(appointmentId);
    getDashData();
  };

  const handleCancel = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    getDashData();
  };

  return (
    dashData && (
      <div className="w-full">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Doctor dashboard
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold text-slate-900">
              Today at a glance
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track your earnings, patient volume, and appointment actions from one place.
            </p>
          </div>
          <button
            onClick={getDashData}
            className="w-fit rounded-full border border-teal-200 bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-50"
          >
            Refresh dashboard
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
            <span className="rounded-2xl bg-emerald-50 p-3">
              <img className="w-10" src={assets.earning_icon} alt="" />
            </span>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {currency} {dashData?.earnings}
              </p>
              <p className="text-sm text-slate-500">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
            <span className="rounded-2xl bg-teal-50 p-3">
              <img className="w-10" src={assets.appointments_icon} alt="" />
            </span>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {dashData?.appointments}
              </p>
              <p className="text-sm text-slate-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
            <span className="rounded-2xl bg-slate-50 p-3">
              <img className="w-10" src={assets.patients_icon} alt="" />
            </span>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {dashData?.patients}
              </p>
              <p className="text-sm text-slate-500">Patients</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
                  <path d="M7 2h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7Zm2 4h6v2H9V8Zm0 4h6v2H9v-2Zm0 4h4v2H9v-2Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm text-slate-500">Care queue</p>
                <p className="text-2xl font-bold text-slate-900">{appointmentStats.pending}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-white px-3 py-2 text-slate-600">
                <span className="font-bold text-emerald-600">{appointmentStats.completed}</span> completed
              </div>
              <div className="rounded-xl bg-white px-3 py-2 text-slate-600">
                <span className="font-bold text-red-500">{appointmentStats.cancelled}</span> cancelled
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm shadow-teal-950/5">
            <div className="flex flex-col gap-4 border-b border-teal-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2.5">
                <img src={assets.list_icon} alt="" />
                <p className="font-semibold text-slate-900">Latest Bookings</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Pending", "Completed", "Cancelled"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      statusFilter === filter
                        ? "bg-primary text-white"
                        : "bg-teal-50 text-slate-600 hover:bg-teal-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {filteredAppointments.length ? (
                filteredAppointments.map((item, index) => (
                  <div
                    className="flex flex-col gap-4 border-b border-teal-50 px-5 py-4 transition hover:bg-teal-50/50 last:border-b-0 sm:flex-row sm:items-center"
                    key={item?._id || index}
                  >
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={item?.userData?.image}
                      alt={item?.userData?.name || "Patient"}
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold text-slate-800">
                        {item?.userData?.name}
                      </p>
                      <p className="mt-1 text-slate-500">
                        {slotDateFormat(item?.slotDate)} at {item?.slotTime || "scheduled time"}
                      </p>
                    </div>
                    {item.cancelled ? (
                      <p className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        Completed
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCancel(item?._id)}
                          className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleComplete(item?._id)}
                          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-5 py-12 text-center text-sm text-slate-500">
                  No appointments match this filter.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm shadow-teal-950/5">
            <p className="font-semibold text-slate-900">Appointment mix</p>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <div className="mb-2 flex justify-between text-slate-600">
                  <span>Pending</span>
                  <span>{appointmentStats.pending}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${latestAppointments.length ? (appointmentStats.pending / latestAppointments.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-slate-600">
                  <span>Completed</span>
                  <span>{appointmentStats.completed}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${latestAppointments.length ? (appointmentStats.completed / latestAppointments.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-slate-600">
                  <span>Cancelled</span>
                  <span>{appointmentStats.cancelled}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-red-400"
                    style={{ width: `${latestAppointments.length ? (appointmentStats.cancelled / latestAppointments.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
