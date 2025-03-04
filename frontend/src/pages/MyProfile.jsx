import React from "react";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
function MyProfile() {
  const [userData, setUserData] = React.useState({
    name: "Anuj Mumbaikar",
    image: assets.profile_pic,
    email: "anujmumbaikar120405@gmail.com",
    phone: "9000000000",
    address: {
      line1: "57th Cross,Richmond Road",
      line2: "BKC,Mumbai",
    },
    gender: "Male",
    dob: "12/04/2000",
  });
  const [isEdit, setIsEdit] = React.useState(false);
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img  className="w-36 rounded" src={userData.image} alt="" />
      {isEdit ? (
        <input
        className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
          <p className="font-medium">Email id:</p>
          {isEdit ? (
            <input
            className="bg-gray-100"
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.email}</p>
          )}

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input 
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
          <p>Address:</p>
        {isEdit ? (
          <p>
            <input
            className="bg-gray-100"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev.address,
                  line1: e.target.value,
                }))
              }
              type="text"
            />
            <br />
            <input
            className="bg-gray-100"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev.address,
                  line2: e.target.value,
                }))
              }
              type="text"
            />
          </p>
        ) : (
          <p className="text-gray-500">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
        )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
          <p>Gender:</p>
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p>Birthday:</p>
          {
            isEdit? <input type="date" onChange={(e)=>setUserData((prev) => ({ ...prev, dob: e.target.value }))}/> : <p>{userData.dob}</p>
          }
        </div>
      </div>
      <div className="mt-10">{
        
        isEdit ? <button className="border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white duration-300" onClick={()=>setIsEdit(false)}>Save information</button> : <button className="border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white duration-300" onClick={()=>setIsEdit(true)}>Edit</button>
      }
      </div>
    </div>
  );
}

export default MyProfile;
