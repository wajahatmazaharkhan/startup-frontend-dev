import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';
import {
  getAllServices,
  getCounsellorByEmail,
  updateCounsellorProfile,
} from '../services/dashboardService';
import { Toaster, toast } from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import {
  DocumentCard,
  PillInput,
  PillMultiSelect,
  PillSelect,
  Textarea,
} from '../components/form';
import { PhoneCall, Camera, Mic, Video, User } from 'lucide-react';

// Constants
const sessionType = Object.freeze([
  'Video Session',
  'Voice Session',
  'Chat Session',
]);

const LANGUAGE_OPTIONS = Object.freeze({
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  ta: 'Tamil',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  zh: 'Chinese',
  ja: 'Japanese',
});

// Mock Data for Right Sidebar
const SESSIONS_HISTORY = [
  {
    id: 1,
    name: 'Dr. Abhishek Mehta',
    type: 'Voice Session',
    duration: '50m',
    date: '12 OCT',
    time: '04:00PM',
    mode: 'voice',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek',
  },
  {
    id: 2,
    name: 'Dr. Anjali Singh',
    type: 'Video Session',
    duration: '50m',
    date: '12 OCT',
    time: '04:00PM',
    mode: 'video',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
  },
  {
    id: 3,
    name: 'Dr. Rahul Verma',
    type: 'Voice Session',
    duration: '50m',
    date: '12 OCT',
    time: '04:00PM',
    mode: 'voice',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
  },
  {
    id: 4,
    name: 'Dr. Priya Kapoor',
    type: 'Video Session',
    duration: '50m',
    date: '12 OCT',
    time: '04:00PM',
    mode: 'video',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
];

const CounsellorSettings = () => {
  const navigate = useNavigate();
  const { clientEmail, isCounsellor, setIsCounsellor, profilePic } =
    useAuthStore();
  const [counsellorData, setCounsellorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const profileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const calculateAge = (dob) => {
    if (!dob) return 'Age not set';
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let days = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24),
    );
    return `${years} years, ${days} days`;
  };

  useEffect(() => {
    const fetchCounsellorData = async () => {
      try {
        setLoading(true);

        if (!clientEmail) {
          toast.error('Email not found. Please log in again.');
          navigate('/login');
          return;
        }

        const [counsellorRes, servicesRes] = await Promise.all([
          getCounsellorByEmail(clientEmail),
          getAllServices(),
        ]);

        setAvailableServices(servicesRes.data || []);

        if (counsellorRes?.data) {
          setCounsellorData(counsellorRes.data);
          setIsCounsellor(true);

          setFormData({
            fullname: counsellorRes.data?.fullname || '',
            dob: counsellorRes.data?.dob || '',
            phone_number: counsellorRes.data?.phone_number || '',
            gender: counsellorRes.data?.gender || '',
            languages: counsellorRes.data?.languages || [],
            specialties: counsellorRes.data?.specialties || '',
            services: counsellorRes.data?.services || [],
            qualifications: counsellorRes.data?.qualifications || '',
            years_experience: counsellorRes.data?.years_experience || '',
            bio: counsellorRes.data?.bio || '',
            availability: counsellorRes.data?.availability || '',
            hourly_rate: counsellorRes.data?.hourly_rate || '',
            session_type: counsellorRes.data?.session_type || '',
            documents: counsellorRes.data?.documents || {},
          });
        } else {
          setIsCounsellor(false);
          toast.error('You are not registered as a counsellor.');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellorData();
  }, [clientEmail, navigate, setIsCounsellor]);

  const serviceOptions = useMemo(() => {
    return availableServices.reduce((acc, service) => {
      acc[service._id] = service.title;
      return acc;
    }, {});
  }, [availableServices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, value) => {
    const onlyIds = Array.isArray(value) ? value : Object.keys(value);
    setFormData((prev) => ({ ...prev, [name]: onlyIds }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
      toast.success(`${fieldName.replace('_', ' ')} selected`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!clientEmail) return toast.error('Email not found');

    try {
      setSaving(true);
      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (key === 'documents') return;
        if (Array.isArray(value)) {
          value.forEach((item) => dataToSend.append(key, item));
        } else if (value !== null && value !== undefined) {
          dataToSend.append(key, value);
        }
      });

      Object.keys(files).forEach((key) => {
        if (files[key]) {
          dataToSend.append(key, files[key]);
        }
      });

      const response = await updateCounsellorProfile(dataToSend);

      if (
        response &&
        (response.status === 200 || response.data?.success || response.success)
      ) {
        setCounsellorData(response.data || response);
        setFiles({});
        toast.success('Profile updated successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner />
      </div>
    );
  }

  if (!isCounsellor || !counsellorData) return null;

  return (
    <div className='min-h-screen bg-white py-6 px-4 lg:px-8 w-full flex flex-col items-center'>
      <Toaster position='top-right' />

      {/* Main Wrapper Form */}
      <form onSubmit={handleSave} className='w-full max-w-7xl space-y-8'>
        {/* ================= HEADER SECTION (Full Width) ================= */}
        <div className='flex flex-col md:flex-row gap-6 items-center md:items-start p-6 bg-white rounded-3xl border border-gray-200 shadow-xs'>
          {/* Profile Picture */}
          <div className='relative group shrink-0'>
            <img
              src={
                files.profile_picture
                  ? URL.createObjectURL(files.profile_picture)
                  : counsellorData.documents?.profile_picture ||
                    profilePic ||
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=b6e3f4'
              }
              alt='Profile'
              className='w-28 h-28 rounded-full object-cover border-4 border-purple-100 shadow-sm'
            />
            <button
              type='button'
              onClick={() => profileInputRef.current.click()}
              className='absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full shadow-md hover:bg-purple-700 transition'
            >
              <Camera size={16} />
            </button>
            <input
              type='file'
              ref={profileInputRef}
              className='hidden'
              accept='image/*'
              onChange={(e) => handleFileChange(e, 'profile_picture')}
            />
          </div>

          {/* Name & Speciality Info */}
          <div className='flex-1 w-full md:w-auto flex flex-col justify-center text-center md:text-left space-y-3 pt-2'>
            {/* Top Part: Name + Age + Edit Button */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-2'>
              <div className='flex items-baseline gap-3'>
                <h1 className='text-3xl text-gray-900 font-bold'>
                  {counsellorData.fullname}
                </h1>
                <span className='text-gray-500 text-sm'>
                  {calculateAge(formData.dob)}
                </span>
              </div>

              {/* Edit Button (Desktop) */}
              <div className='hidden md:block'>
                <button
                  type='submit'
                  disabled={saving}
                  className='px-6 py-2 bg-violet-100 text-violet-900 text-sm font-semibold rounded-full hover:bg-violet-200 transition flex items-center gap-2'
                >
                  <span>Edit</span>
                  <span className='text-xs'>✎</span>
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <div className='h-px w-full bg-linear-to-r from-gray-400 via-gray-300 to-transparent'></div>

            {/* Bottom Part: Speciality */}
            <p className='text-gray-800 font-medium text-lg'>
              {counsellorData.specialties} Specialist
            </p>
          </div>
        </div>

        {/* ================= MAIN GRID CONTENT (5 Columns) ================= */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
          {/* ----- LEFT COLUMN: FORM INPUTS (Span 3) ----- */}
          <div className='lg:col-span-3 space-y-8'>
            {/* PERSONAL INFO */}
            <section>
              <h2 className='text-gray-500 font-medium mb-4 text-sm'>
                Personal
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                <PillInput
                  type='date'
                  name='dob'
                  value={formData.dob ? formData.dob.split('T')[0] : ''}
                  onChange={handleInputChange}
                />
                <PillInput
                  type='tel'
                  name='phone_number'
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
                <div className='col-span-2'>
                  <PillMultiSelect
                    options={LANGUAGE_OPTIONS}
                    value={formData.languages}
                    onChange={(e) => handleMultiSelectChange('languages', e)}
                    icon={<PhoneCall />}
                  />
                </div>
                <PillSelect
                  name='gender'
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </PillSelect>
              </div>
            </section>

            {/* PROFESSIONAL INFO */}
            <section>
              <h2 className='text-gray-500 font-medium mb-4 text-sm'>
                Professional
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='md:col-span-2'>
                  <PillMultiSelect
                    placeholder='Select Services Provided'
                    options={serviceOptions}
                    value={formData.services}
                    onChange={(val) => handleMultiSelectChange('services', val)}
                  />
                </div>
                <PillInput
                  type='text'
                  name='specialties'
                  value={formData.specialties}
                  onChange={handleInputChange}
                  placeholder='Specialties'
                />
                <div className='md:col-span-1'>
                  <PillInput
                    type='number'
                    name='years_experience'
                    min='0'
                    value={formData.years_experience}
                    onChange={handleInputChange}
                    placeholder='Years of Experience (5+)'
                  />
                </div>

                <div className='md:col-span-2'>
                  <Textarea
                    name='bio'
                    value={formData.bio}
                    onChange={handleInputChange}
                    required
                    placeholder='Write a short bio about yourself...'
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* AVAILABILITY & PRICING */}
            <section>
              <h2 className='text-gray-500 font-medium mb-4 text-sm'>
                Availability & Pricing
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <PillInput
                  type='text'
                  name='availability'
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder='9AM to 7PM, Mon - Sun'
                />
                <PillInput
                  type='number'
                  name='hourly_rate'
                  min='0'
                  value={formData.hourly_rate}
                  onChange={handleInputChange}
                  placeholder='₹999/- per hour'
                />
              </div>
            </section>

            {/* SESSION PREFERENCE */}
            <section>
              <h2 className='text-gray-500 font-medium mb-4 text-sm'>
                Session Preference
              </h2>
              <div className='w-full md:w-1/2'>
                <PillSelect
                  value={formData.session_type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      session_type: e.target.value,
                    }))
                  }
                >
                  <option value=''>All Sessions</option>
                  {sessionType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </PillSelect>
              </div>
            </section>

            {/* DOCUMENTS */}
            <section>
              <h2 className='text-gray-500 font-medium mb-4 text-sm'>
                Documents
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <DocumentCard
                  label='Government ID'
                  isUploaded={
                    !!files.government_id ||
                    !!counsellorData.documents?.government_id
                  }
                  onChange={(e) => handleFileChange(e, 'government_id')}
                />
                <DocumentCard
                  label='Qualification Certificates'
                  isUploaded={
                    !!files.qualification_certificates ||
                    !!counsellorData.documents?.qualification_certificates
                  }
                  onChange={(e) =>
                    handleFileChange(e, 'qualification_certificates')
                  }
                />
                <DocumentCard
                  label='Experience Letters'
                  isUploaded={
                    !!files.experince_letter ||
                    !!counsellorData.documents?.experince_letter
                  }
                  onChange={(e) => handleFileChange(e, 'experince_letter')}
                />
                <DocumentCard
                  label='Additional Certificates'
                  isUploaded={
                    !!files.additional_documents ||
                    !!counsellorData.documents?.additional_documents
                  }
                  onChange={(e) => handleFileChange(e, 'additional_documents')}
                />
                <DocumentCard
                  label='Professional License'
                  isUploaded={
                    !!files.licence || !!counsellorData.documents?.licence
                  }
                  onChange={(e) => handleFileChange(e, 'licence')}
                />
              </div>
              <p className='text-[10px] text-gray-400 text-right mt-1'>
                *PDF/JPG/PNG
              </p>
            </section>

            {/* NOTIFICATION PREFERENCE */}
            {/* <section>
              <h2 className='text-gray-500 font-medium mb-4 text-sm'>
                Notification Preference
              </h2>
              <div className='w-full md:w-1/2 relative'>
                <div className='w-full rounded-2xl border border-gray-300 bg-white py-2 px-4 text-sm text-neutral-700 flex justify-between items-center cursor-pointer hover:border-purple-400 transition'>
                  <span>Email & Message</span>
                  <span className='text-gray-500'>🔔</span>
                </div>
              </div>
            </section> */}

            {/* Mobile Submit Button */}
            <div className='flex justify-end pt-4 pb-12 md:hidden'>
              <button
                type='submit'
                disabled={saving}
                className='px-8 py-3 bg-violet-200 text-blue-950 font-semibold rounded-2xl hover:bg-violet-300 w-full'
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>

          {/* ----- RIGHT COLUMN: HISTORY (Span 1) ----- */}
          <div className='lg:col-span-2 border-l border-gray-200 lg:pl-6 space-y-6'>
            <div className='flex items-center gap-2'>
              <h2 className='text-gray-500 font-medium text-lg'>
                Sessions History
              </h2>
            </div>

            <div className='space-y-4'>
              {SESSIONS_HISTORY.map((session) => (
                <div
                  key={session.id}
                  className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition cursor-pointer group'
                >
                  <img
                    src={session.avatar}
                    alt={session.name}
                    className='w-10 h-10 rounded-full bg-orange-100 border border-gray-100'
                  />
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-sm font-bold text-gray-900 truncate group-hover:text-purple-600 transition'>
                      {session.name}
                    </h3>
                    <p className='text-xs text-gray-500'>
                      {session.duration} • {session.type}
                    </p>
                  </div>
                  <div className='flex flex-col items-end gap-0.5'>
                    <div className='text-gray-400'>
                      {session.mode === 'video' ? (
                        <Video size={14} />
                      ) : (
                        <Mic size={14} />
                      )}
                    </div>
                    <span className='text-[10px] text-gray-400 font-medium'>
                      {session.date}
                    </span>
                    <span className='text-[10px] text-gray-300'>
                      {session.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex justify-center mt-6'>
              <button
                type='button'
                className='px-5 py-1.5 bg-gray-100 text-gray-600 font-medium rounded-full hover:bg-gray-200 transition text-xs'
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CounsellorSettings;
