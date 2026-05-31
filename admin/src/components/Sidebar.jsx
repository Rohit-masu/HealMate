import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DontorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-3 py-3.5 text-sm font-medium transition md:px-5 ${
      isActive
        ? "bg-teal-50 text-primary shadow-sm"
        : "text-slate-600 hover:bg-teal-50/70 hover:text-primary"
    }`;

  return (
    <aside className="sticky top-[73px] min-h-[calc(100vh-73px)] border-r border-teal-100 bg-white/85 px-2 py-5 shadow-sm shadow-teal-950/5 backdrop-blur md:px-4">
      {aToken && (
        <ul className="flex flex-col gap-2">
          <NavLink
            className={linkClass}
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={linkClass}
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={linkClass}
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={linkClass}
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctor List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="flex flex-col gap-2">
          <NavLink
            className={linkClass}
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={linkClass}
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={linkClass}
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
