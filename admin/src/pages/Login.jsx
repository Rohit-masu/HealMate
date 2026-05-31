import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DontorContext";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const switchRole = (role) => {
    setState(role);
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.removeItem("dToken");
          setDToken("");
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          if (data.api_key) localStorage.setItem("api_key", data.api_key);
          navigate("/admin-dashboard", { replace: true });
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.removeItem("aToken");
          setAToken("");
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          if (data.api_key) localStorage.setItem("api_key", data.api_key);
          navigate("/doctor-dashboard", { replace: true });
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="grid min-h-screen items-center gap-8 bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-5 py-10 lg:grid-cols-[1fr_0.9fr] lg:px-16">
      <div className="hidden rounded-[2rem] bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-600 p-10 text-white shadow-2xl shadow-teal-950/20 lg:block">
        <div className="mb-12 w-fit rounded-2xl bg-white px-4 py-3">
          <img className="w-40" src={assets.admin_logo} alt="HealMate" />
        </div>
        <p className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
          HealMate operations
        </p>
        <h1 className="font-display mt-6 text-5xl font-bold leading-tight">
          Clear access for admins and doctors.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-emerald-50/90">
          Use the role cards to choose the right workspace. Admin manages the
          care network; doctors manage appointments and profile availability.
        </p>
      </div>

      <form
        key={state}
        onSubmit={onSubmitHandler}
        autoComplete="off"
        className="mx-auto w-full max-w-md rounded-[2rem] border border-teal-100 bg-white p-6 text-sm text-slate-600 shadow-xl shadow-teal-950/10 sm:p-8"
      >
        <img className="mb-8 w-40 lg:hidden" src={assets.admin_logo} alt="HealMate" />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Secure portal
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold text-slate-900">
          {state} Login
        </h2>
        <p className="mt-2 leading-6">
          {state === "Admin"
            ? "Access dashboards, doctors, and appointment operations."
            : "Access your doctor dashboard, schedule, and profile."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => switchRole("Admin")}
            className={`rounded-2xl border p-4 text-left transition ${
              state === "Admin"
                ? "border-primary bg-teal-50 text-primary shadow-sm"
                : "border-slate-200 hover:border-teal-200 hover:bg-teal-50/60"
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 2 4 5.5v6.2c0 5 3.4 9.5 8 10.3 4.6-.8 8-5.3 8-10.3V5.5L12 2Zm0 3.1 5 2.2v4.4c0 3.4-2.1 6.5-5 7.3-2.9-.8-5-3.9-5-7.3V7.3l5-2.2Z" />
              </svg>
            </span>
            <span className="mt-3 block font-semibold">Admin</span>
            <span className="mt-1 block text-xs text-slate-500">Manage platform</span>
          </button>
          <button
            type="button"
            onClick={() => switchRole("Doctor")}
            className={`rounded-2xl border p-4 text-left transition ${
              state === "Doctor"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                : "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/60"
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0H5Zm13-11h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2Z" />
              </svg>
            </span>
            <span className="mt-3 block font-semibold">Doctor</span>
            <span className="mt-1 block text-xs text-slate-500">Manage care</span>
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-4">
          <label className="w-full">
            <span className="font-medium text-slate-700">Email</span>
            <input
              className="mt-2 w-full rounded-xl border border-teal-100 bg-teal-50/40 p-3 outline-none transition focus:border-primary focus:bg-white"
              type="email"
              required
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              name={state === "Admin" ? "admin-email" : "doctor-email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label className="w-full">
            <span className="font-medium text-slate-700">Password</span>
            <input
              className="mt-2 w-full rounded-xl border border-teal-100 bg-teal-50/40 p-3 outline-none transition focus:border-primary focus:bg-white"
              type="password"
              required
              autoComplete="new-password"
              name={state === "Admin" ? "admin-password" : "doctor-password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <button
          className={`mt-6 w-full rounded-full py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 ${
            state === "Admin"
              ? "bg-primary shadow-teal-700/20 hover:bg-teal-800"
              : "bg-emerald-600 shadow-emerald-700/20 hover:bg-emerald-700"
          }`}
        >
          Login as {state}
        </button>
      </form>
    </section>
  );
};

export default Login;
