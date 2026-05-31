import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <div className="sticky top-0 z-30 mb-6 flex items-center justify-between border-b border-teal-100/80 bg-white/90 py-4 text-sm backdrop-blur-xl">
      <img
        onClick={() => navigate("/")}
        className="w-40 cursor-pointer transition duration-300 hover:opacity-85"
        src={assets.logo}
        alt="HealMate"
      />
      <ul className="hidden items-center gap-7 font-medium tracking-[0.02em] text-slate-600 md:flex">
        <NavLink to="/">
          <li className="py-1 transition hover:text-primary">HOME</li>
          <hr className="m-auto hidden h-0.5 w-3/5 border-none bg-primary outline-none" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 transition hover:text-primary">ALL DOCTORS</li>
          <hr className="m-auto hidden h-0.5 w-3/5 border-none bg-primary outline-none" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 transition hover:text-primary">ABOUT</li>
          <hr className="m-auto hidden h-0.5 w-3/5 border-none bg-primary outline-none" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 transition hover:text-primary">CONTACT</li>
          <hr className="m-auto hidden h-0.5 w-3/5 border-none bg-primary outline-none" />
        </NavLink>
        <a 
          href={import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-semibold text-primary transition hover:bg-teal-100"
        >
          ADMIN PANEL
        </a>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className=" flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 h-8 rounded-full" src={userData ? userData.image : assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute right-0 top-0 z-20 hidden pt-14 text-base font-medium text-slate-600 group-hover:block">
              <div className="flex min-w-48 flex-col gap-4 rounded-lg border border-teal-100 bg-white p-4 shadow-xl shadow-teal-950/10">
                <p
                  onClick={() => navigate("/my-profile")}
                  className=" hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className=" hover:text-black  cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={logout}
                  className=" hover:text-black  cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden rounded-full bg-primary px-7 py-3 font-medium text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 md:block"
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/* --------------- Mobile Menu----------- */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } bottom-0 right-0 top-0 z-40 overflow-hidden bg-white transition-all md:hidden`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="HealMate" />
            <img
              className="w-6"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="mt-5 flex flex-col items-center gap-2 px-5 text-lg font-medium text-slate-700">
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
            <a 
              href={import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 rounded-full border border-teal-200 bg-teal-50 px-8 py-2 text-sm font-semibold text-primary"
              onClick={() => setShowMenu(false)}
            >
              ADMIN PANEL
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
