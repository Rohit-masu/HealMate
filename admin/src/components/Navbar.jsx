import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DontorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    setDToken("");
    localStorage.removeItem("dToken");
    navigate("/", { replace: true });
  };
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-teal-100 bg-white/90 px-4 py-3 shadow-sm shadow-teal-950/5 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="HealMate"
        />
        <p className={`rounded-full border px-3 py-1 font-semibold ${aToken ? "border-teal-200 bg-teal-50 text-primary" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
          {aToken ? "Admin" : "Doctor"}
        </p>
        <a 
          href={import.meta.env.VITE_USER_URL || 'http://localhost:5173'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          USER PORTAL
        </a>
      </div>
      <button
        onClick={logout}
        className="cursor-pointer rounded-full bg-primary px-7 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
