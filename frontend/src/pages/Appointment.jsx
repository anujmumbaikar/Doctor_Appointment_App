import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Appointment() {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,getDoctorsData ,accessToken} = useContext(AppContext);
  const [docInfo, setDocInfo] = useState([]);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [docSlots, setDocSlots] = useState([]);

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const sloteTime = formattedTime;
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(sloteTime) ? false : true;
        
        if(isSlotAvailable){
          timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async()=>{
    if(!accessToken){
        toast.warning('Please login to book an appointment')
        return navigate('/login')
    }
    try {
        const date = docSlots[slotIndex][0].dateTime
        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const {data} = await axios.post(`${backendUrl}/api/v1/user/book-appointment`,{
            docId,
            slotDate,
            slotTime,
        },{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }) 
        if(data.success){
            toast.success(data.message)
            getDoctorsData()
            navigate('/my-appointments')
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error.message);
    }
}

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-blue-400 w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt={docInfo.name} />
          </div>
          <div className="flex-1 border border-gray-600 rounded-lg p-8 py-7">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-800">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="px-2 py-0.5 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-600 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-600">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium my-4">
              Appointment fee: <span className="font-bold">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center mt-4 w-full overflow-x-scroll">
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index? "bg-blue-400 text-white" : "border border-gray-600"}`} key={index}>
                {item.length > 0 && (
                  <>
                    <p>{daysOfWeek[item[0].dateTime.getDay()]}</p>
                    <p>{item[0].dateTime.getDate()}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-center mt-4 w-full overflow-x-scroll">
            {docSlots.length && docSlots[slotIndex].map((item, index) => (
              <div onClick={()=> setSlotTime(item.time)} className={`text-center py-3 min-w-20 rounded-full cursor-pointer ${slotTime === item.time? "bg-blue-400 text-white" : "border border-gray-600"}`} key={index}>
                {item.time}
              </div>
            ))}
          </div>
          <button onClick={bookAppointment} className="bg-blue-500 text-white mt-4 text-sm font-light px-14 py-3 rounded-full hover:scale-105 transition-all duration-300">Book an Appointment</button>
        </div>



        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

      </div>
    )
  );
}

export default Appointment;