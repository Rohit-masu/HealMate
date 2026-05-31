import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import MoveUpOnRender from "../../components/MoveUpOnRender";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="max-h-[90vh] overflow-y-scroll">
      <MoveUpOnRender id="admin-doctorlist">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Care network</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-slate-900">All Doctors</h1>

        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 pt-6">
          {doctors.map((item, index) => (
            <div
              className="group cursor-pointer overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm shadow-teal-950/5 transition hover:-translate-y-1 hover:shadow-lg"
              key={index}
            >
              <img
                className="w-full bg-teal-50 transition-all duration-300 group-hover:bg-emerald-100"
                src={item.image}
                alt=""
              />
              <div className="p-4 ">
                <p className="text-lg font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="text-sm text-slate-600">{item.speciality}</p>

                <div className="mt-5 flex items-center gap-1 text-sm">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p className="text-slate-600">Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MoveUpOnRender>
    </div>
  );
};

export default DoctorsList;
