import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function MyAppointments() {
  const { doctors, accessToken, backendUrl } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]); // ✅ Default empty array

  const getMyAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/my-appointments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setAppointments(data.data); // ✅ Fix: Use `data.data` instead of `data.appointments`
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getMyAppointments();
    }
  }, [accessToken]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {Array.isArray(appointments) &&
          appointments.slice(0, 100).map((items, index) => (
            <div
              className="grid grig-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 px-2 border-b py-4"
              key={index}
            >
              <div>
                <img className="w-40 bg-indigo-50" src={items.docData?.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zonc-600">
                <p className="text-sm">{items.docData?.name}</p>
                <p className="text-sm">{items.docData?.speciality}</p>
                <p className="font-bold text-zinc-600">Address</p>
                <p>{items.docData?.address?.line1}</p>
                <p>{items.docData?.address?.line2}</p>
                <p>
                  <span className="font-bold text-zinc-600">Date & Time: </span>
                  {items.slotDate} | {items.slotTime}
                </p>
              </div>
              <div className="flex flex-col justify-end gap-2">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyAppointments;
