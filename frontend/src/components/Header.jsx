import React from "react";
import { assets } from "../assets/assets";
function Header() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-2xl px-6 md:px-10 lg:px-20">
      {/* -------Left side -------*/}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white ">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 text-white font-light">
          <img src={assets.group_profiles} alt="" className="w-28"/>
          <p>
            Simply browse through our extensive list of trusted doctors <br className="hidden sm:block"/>
            schedule an appointment
          </p>
        </div>
        <a href="#speciality" className="flex items-center gap-2  px-8 py-3 bg-white rounded-full text-gray-500 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300">Book Appointment <img src={assets.arrow_icon} alt="" className="w-3"/> </a>
      </div>
      {/* -------Right side -------*/}
      <div className="md:w-1/2 relative">
        <img src={assets.header_img} alt="" className="w-full md:absolute bottom-0 h-auto rounded-lg" />
      </div>
    </div>
  );
}

export default Header;
