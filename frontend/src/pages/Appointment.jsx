// import React, { useEffect, useContext, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";

// function Appointment() {
//   const { docId } = useParams();
//   const { doctors, currencySymbol } = useContext(AppContext);
//   const [docInfo, setDocInfo] = useState([]);
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");
//   const [docSlots, setDocSlots] = useState([]);

//   const getAvailableSlots = async () => {
//     //clearing the previous slots
//     setDocSlots([]);

//     //getting current date
//     let today = new Date();
//     console.log(today);
//     for (let i = 0; i < 7; i++) {
//       //getting date with index
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       //setting the end time of the day
//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(21, 0, 0, 0);

//       //setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes()>30? 30:0)
//       }else{
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = [];
//       while(currentDate<endTime){
//         let formattedTime = currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

//         //add slot to array
//         timeSlots.push({dateTime:new Date(currentDate),time:formattedTime})

//         //increment current time by 30min
//         currentDate.setMinutes(currentDate.getMinutes()+30)

//       }
//       setDocSlots(prev => ([...prev,timeSlots]))
//     }
//   };
//   useEffect(() => {

//     getAvailableSlots();
//   }, [docInfo]);

//   useEffect(() => {
//     console.log(docSlots);
    
//   },[docSlots])

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find((doc) => doc._id === docId);
//     setDocInfo(docInfo);
//     console.log(docInfo);
//   };

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   return (
//     docInfo && (
//       <div>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-blue-400 w-full sm:max-w-72 rounded-lg"
//               src={docInfo.image}
//               alt={docInfo.name}
//             />
//           </div>
//           <div className="flex-1 border border-gray-600 rounded-lg p-8 py-7">
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-800">
//               {docInfo.name}
//               <img src={assets.verified_icon} alt="" />
//             </p>
//             <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
//               <p>
//                 {docInfo.degree} - {docInfo.speciality}
//               </p>
//               <button className="px-2 py-0.5 border text-xs rounded-full">
//                 {docInfo.experience}
//               </button>
//             </div>
//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-gray-600 mt-3">
//                 about <img src={assets.info_icon} alt="" />
//               </p>
//               <p className="text-sm text-gray-600">{docInfo.about}</p>
//             </div>
//             <p className="text-gray-500 font-medium my-4">
//               Appointment fee:{" "}
//               <span className="font-bold">
//                 {currencySymbol}
//                 {docInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div> 
//         <div className="sm:ml-72 sm:pl-4 mt04 font-medium text-gray-600">
//           <p>Booking Slots</p>
//           <div>
//             {
//               docSlots.length && docSlots.map((item,index) => (
//                 <div key={index}>
//                   <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//                   <p>{item[0] && item[0].datetime.getDate()}</p>
//                 </div>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//     )
//   );
// }

// export default Appointment;

import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
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
      endTime.setHours(21, 30, 0, 0);

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
        timeSlots.push({ dateTime: new Date(currentDate), time: formattedTime });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
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
        </div>
      </div>
    )
  );
}

export default Appointment;
