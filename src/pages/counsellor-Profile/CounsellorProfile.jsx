import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CounsellorProfileHeader from './components/CounsellorProfileHeader';
import AboutDoctorCard from './components/AboutTheDoctor';
import Shortbio from './components/Shortbio';
import CounsellorPageMedia from './components/CounsellorPageMedia';
import CounsellorPricingSection from './components/CounsellorPricingSection';
import BackNavigation from '../../assets/BackNavigation.svg';
import { Link } from 'react-router-dom';

import { cousellorServiceByEmail } from '../../services/dashboardService';

function CounsellorProfile() {
  const { email } = useParams();
  const [counsellorData, setCounsellorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const res = await cousellorServiceByEmail(email);
        setCounsellorData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellor();
  }, [email]);

  if (loading) return <p>Loading...</p>;
  if (!counsellorData) return <p>Counsellor not found</p>;

  return (
    <div className='px-5 sm:px-10 md:px-15 lg:px-18 xl:px-20 mt-5'>
      <Link to='/counsellor' >
      <button className='mb-3.5 hover:cursor-pointer sm:mb-4'>
        <img src={BackNavigation} alt='backArrow icon' className='w-[15px] sm:w-[30px]' />
      </button>
      </Link>
      <div className='flex flex-col gap-5 sm:gap-13 mb-2'>
        <div className='flex flex-col sm:flex-row gap-6 w-full'>
          <div className='w-full sm:w-[60%]'>

            {/* 👇 SAME COMPONENT, REAL DATA */}
            <CounsellorProfileHeader
              profiledata={{
                profileImage : counsellorData.documents.profile_picture,
                name: counsellorData.fullname,
                isVerified: counsellorData.Admin_approved,
                specialization: counsellorData.counselling_type,
                languages: counsellorData.languages,
                clientsHelped: 0, // backend doesn’t have this yet
                rating: counsellorData.rating,
                reviewsCount: counsellorData.rating_count,
                acceptingNewClients: counsellorData.status === "active",
              }}
            />
          </div>

          <CounsellorPageMedia sessionTypes={counsellorData.session_type} />
        </div>

        <div className='flex flex-col sm:flex-row gap-10'>
          <div className='flex flex-col gap-7.5 sm:w-[60%]'>

            <Shortbio bioPoints={counsellorData.bio} />

            <CounsellorPricingSection
              pricing={[
                {
                  id: counsellorData.slug || 'service-1',
                  name: counsellorData.counselling_type,
                  price: counsellorData.hourly_rate,
                  currency: '₹',
                },
              ]}
            />

          </div>

          <div className='mx-auto sm:mx-0'>
            <AboutDoctorCard
              doctorInfo={{
                details: [
                  {
                    heading: `${counsellorData.years_experience}+ years of experience`,
                    description: counsellorData.specialties,
                  },
                  {
                    heading: 'Qualifications',
                    description: counsellorData.qualifications,
                  },
                  {
                    heading: 'Session Types',
                    description: Array.isArray(counsellorData.session_type)
                      ? counsellorData.session_type.join(', ')
                      : '',
                  },
                ],
                buttonText: 'Book an Appointment',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounsellorProfile;
