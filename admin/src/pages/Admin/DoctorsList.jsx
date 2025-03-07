import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext.jsx';

function DoctorsList() {
  const { doctors, getAllDoctors, adminToken,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((items, index) => (
            <div className='border border-blue-300 rounded-2xl max-w-56 overflow-hidden cursor-pointer group' key={index}> {/* Use parentheses () to return JSX directly */}
              <img className='bg-indigo-100 group-hover:bg-blue-400 duration-300' src={items.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{items.name}</p>
                <p className='text-zinc-600 text-sm'>{items.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm text-neutral-600'>
                  <input onChange={()=>changeAvailability(items._id)} type="checkbox" checked={items.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoctorsList;
