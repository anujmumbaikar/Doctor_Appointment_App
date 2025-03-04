import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

function Appointment() {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-blue-400 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>
        <div className='flex-1 border border-gray-600 rounded-lg p-8 py-7'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-800'>
            {docInfo.name}
            <img src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 mt-1 text-gray-600 text-sm'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='px-2 py-0.5 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-600 mt-3'>about <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-600'>{docInfo.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;