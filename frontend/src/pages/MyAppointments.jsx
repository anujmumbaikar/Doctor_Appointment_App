import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
function MyAppointments() {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className="pb-3  mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {doctors.slice(0, 2).map((items, index) => (
          <div className="grid grig-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 px-2 border-b py-4" key={index}>
            <div>
              <img className="w-40 bg-indigo-50" src={items.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zonc-600">
              <p className="text-sm">{items.name}</p>
              <p className="text-sm">{items.speciality}</p>
              <p className="font-bold text-zinc-600">Address</p>
              <p>{items.address.line1}</p>
              <p>{items.address.line2}</p>
              <p><span className="font-bold text-zinc-600">Date & Time: </span>25,July,2025 | 6:30PM</p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-2">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">Pay Online</button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300">Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
