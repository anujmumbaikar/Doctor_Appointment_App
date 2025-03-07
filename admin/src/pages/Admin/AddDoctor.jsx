import React, { useContext } from "react";
import { assets } from "../../assets/assets.js";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
function AddDoctor() {

  const [docImg, setDocImg] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [experience, setExperience] = React.useState("1 Year");
  const [fees, setFees] = React.useState("");
  const [speciality, setSpeciality] = React.useState("General physician");
  const [degree, setDegree] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [about, setAbout] = React.useState("");


const {backendurl,adminToken} = useContext(AdminContext)

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      if(!docImg){
        return toast.error("Please upload doctor image")
      }
      const formData = new FormData();
      //these fields should be same as the fields in the backend
      formData.append('imageFile',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
      formData.append('about',about)

      // 
      formData.forEach((value,key)=>{
        console.log(key,value)
      }
      )
      console.log(adminToken);
      
      const {data} = await axios.post(`${backendurl}/api/v1/admin/add-doctor`,formData,{
        //from where does {data }coming from??
        //from the response of the axios.post it is the response of the post request ,it includes the data that is sent from the backend
        //for example if the backend sends {success:true,message:"Doctor added successfully"} then the data will be {success:true,message:"Doctor added successfully"}

        headers:{
          'Content-Type':'multipart/form-data',
          'Authorization':`Bearer ${adminToken}`
        },
        creditional:'include'
      })
      console.log(data.message);
      
      if(data.success){
        toast.success(data.message)
        setDocImg(false) 
        setName("")
        setEmail("")
        setPassword("")
        setExperience("1 Year")
        setFees("")
        setSpeciality("General physician")
        setDegree("")
        setAddress1("")
        setAddress2("") 
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      
    }

  }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded-2xl w-full max-w-4xl max-h=[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg? URL.createObjectURL(docImg):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br />
            Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-aray-600">
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name:</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-3" type="text" placeholder="Name" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email:</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-3" type="email" placeholder="Email" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password:</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-3" type="password" placeholder="Password" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Experience:</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-3">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div>
              <p className="flex-1 flex flex-col gap-1">Doctor Fees:</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-3" type="number" placeholder="Fees" required />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-3">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education:</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="border rounded px-3 py-3" type="text" placeholder="Fees" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address:</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-3" type="text" placeholder="address 1" required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className="border rounded px-3 py-3" type="text" placeholder="address 2" required />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor:</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="border w-full rounded px-3 py-3" placeholder="Write about doctor" rows={5} required />
        </div>
        <button type="submit" className="px-7 py-3 rounded-full bg-blue-500 text-white">Add doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor;


