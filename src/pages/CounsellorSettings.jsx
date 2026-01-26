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
import { PhoneCall, Paperclip, Camera } from 'lucide-react';

// Reusable Document Card Component

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
  // Separate state for files to be uploaded
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

          // Populate form with existing data
          setFormData({
            // Personal
            fullname: counsellorRes.data?.fullname || '',
            dob: counsellorRes.data?.dob || '',
            phone_number: counsellorRes.data?.phone_number || '',
            gender: counsellorRes.data?.gender || '',
            languages: counsellorRes.data?.languages || [],
            // Professional
            specialties: counsellorRes.data?.specialties || '',
            services: counsellorRes.data?.services || [],
            qualifications: counsellorRes.data?.qualifications || '',
            years_experience: counsellorRes.data?.years_experience || '',
            bio: counsellorRes.data?.bio || '',
            // Availability and Pricing
            availability: counsellorRes.data?.availability || '',
            hourly_rate: counsellorRes.data?.hourly_rate || '',
            // Session Preference
            session_type: counsellorRes.data?.session_type || '',
            // Existing Documents URLs (for reference)
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

  // Handle Text Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Multi-selects
  const handleMultiSelectChange = (name, value) => {
    const onlyIds = Array.isArray(value) ? value : Object.keys(value);
    setFormData((prev) => ({ ...prev, [name]: onlyIds }));
  };

  // Handle File Inputs
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

      // 1. Append Text Data
      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        // Skip appending the 'documents' object directly as we handle files separately
        if (key === 'documents') return;

        if (Array.isArray(value)) {
          // Append arrays (languages, services) item by item
          value.forEach((item) => dataToSend.append(key, item));
        } else if (value !== null && value !== undefined) {
          dataToSend.append(key, value);
        }
      });

      // 2. Append Files (Only if a new file was selected)
      // Keys MUST match backend: government_id, profile_picture, etc.
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
        // Clear selected files state after successful upload
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
    <div className='min-h-screen bg-gray-50 py-6 px-4 lg:px-12 w-full flex flex-col items-center justify-center'>
      <Toaster position='top-right' />

      <form onSubmit={handleSave} className='w-full max-w-7xl space-y-8'>
        {/* ================= HEADER & PROFILE PIC ================= */}
        <div className='flex flex-col md:flex-row gap-6 items-center md:items-start p-4 bg-white rounded-3xl border border-gray-200 shadow-xs'>
          <div className='relative group'>
            <img
              src={
                files.profile_picture
                  ? URL.createObjectURL(files.profile_picture)
                  : counsellorData.documents?.profile_picture ||
                    profilePic ||
                    'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=b6e3f4'
              }
              alt='Profile'
              className='w-32 h-32 rounded-full object-cover border-4 border-purple-100 shadow-md'
            />
            <button
              type='button'
              onClick={() => profileInputRef.current.click()}
              className='absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition'
            >
              <Camera size={18} />
            </button>
            {/* Hidden Input for Profile Pic */}
            <input
              type='file'
              ref={profileInputRef}
              className='hidden'
              accept='image/*'
              onChange={(e) => handleFileChange(e, 'profile_picture')}
            />
          </div>

          <div className='flex-1 space-y-2 text-center md:text-left pt-2'>
            <div className='flex flex-col md:flex-row items-center md:items-end gap-3'>
              <h1 className='text-3xl text-gray-900 font-bold'>
                {counsellorData.fullname}
              </h1>
              <span className='text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full text-xs mb-1'>
                {calculateAge(formData.dob)}
              </span>
            </div>
            <div className='h-0.5 w-full bg-gradient-to-r from-gray-400 to-transparent my-2'></div>
            <p className='text-gray-600 text-lg'>
              <span className='font-semibold text-black'>
                {counsellorData.specialties}
              </span>{' '}
              Specialist
            </p>
          </div>
        </div>

        {/* ================= PERSONAL INFO ================= */}
        <section>
          <h2 className='text-gray-400 font-semibold mb-3 uppercase text-xs tracking-wider'>
            Personal Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <PillInput
              type='text'
              name='fullname'
              value={formData.fullname}
              onChange={handleInputChange}
            />
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
            <PillSelect
              name='gender'
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </PillSelect>

            <div className='md:col-span-2'>
              <PillMultiSelect
                options={LANGUAGE_OPTIONS}
                value={formData.languages}
                onChange={(e) => handleMultiSelectChange('languages', e)}
                icon={<PhoneCall />}
              />
            </div>
          </div>
        </section>

        {/* ================= PROFESSIONAL INFO ================= */}
        <section>
          <h2 className='text-gray-400 font-semibold mb-3 uppercase text-xs tracking-wider'>
            Professional Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='md:col-span-2 lg:col-span-3'>
              <PillMultiSelect
                placeholder='Select Services Provided'
                options={serviceOptions}
                value={formData.services}
                onChange={(val) => handleMultiSelectChange('services', val)}
              />
            </div>

            <PillInput
              type='number'
              name='years_experience'
              min='0'
              value={formData.years_experience}
              onChange={handleInputChange}
              placeholder='Years of Experience'
            />
            <PillInput
              type='text'
              name='specialties'
              value={formData.specialties}
              onChange={handleInputChange}
              placeholder='Specialty (e.g. Trauma)'
            />
            <PillInput
              type='text'
              name='qualifications'
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder='Qualifications (e.g. PhD, MSc)'
            />
            <div className='md:col-span-2 lg:col-span-3'>
              <Textarea
                name='bio'
                value={formData.bio}
                onChange={handleInputChange}
                required
                placeholder='Write a short bio about yourself...'
              />
            </div>
          </div>
        </section>

        {/* ================= SESSION & PRICING ================= */}
        <section>
          <h2 className='text-gray-400 font-semibold mb-3 uppercase text-xs tracking-wider'>
            Preferences & Pricing
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <PillSelect
              value={formData.session_type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  session_type: e.target.value,
                }))
              }
            >
              {sessionType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </PillSelect>

            <PillInput
              type='text'
              name='availability'
              value={formData.availability}
              onChange={handleInputChange}
              placeholder='e.g. Mon–Fri 9am–5pm'
            />

            <PillInput
              type='number'
              name='hourly_rate'
              min='0'
              value={formData.hourly_rate}
              onChange={handleInputChange}
              placeholder='Hourly Rate (INR)'
            />
          </div>
        </section>

        {/* ================= DOCUMENTS ================= */}
        <section>
          <h2 className='text-gray-400 font-semibold mb-3 uppercase text-xs tracking-wider'>
            Documents Verification
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <DocumentCard
              label='Government ID'
              sub='Aadhar, PAN, or Passport'
              isUploaded={
                !!files.government_id ||
                !!counsellorData.documents?.government_id
              }
              onChange={(e) => handleFileChange(e, 'government_id')}
            />
            <DocumentCard
              label='Qualification Certificates'
              sub='Degree or Diploma'
              isUploaded={
                !!files.qualification_certificates ||
                !!counsellorData.documents?.qualification_certificates
              }
              onChange={(e) =>
                handleFileChange(e, 'qualification_certificates')
              }
            />
            <DocumentCard
              label='License'
              sub='Professional Practice License'
              isUploaded={
                !!files.licence || !!counsellorData.documents?.licence
              }
              onChange={(e) => handleFileChange(e, 'licence')}
            />
            <DocumentCard
              label='Experience Letter'
              sub='Letter from past employer'
              // Note: Using 'experince_letter' to match backend typo
              isUploaded={
                !!files.experince_letter ||
                !!counsellorData.documents?.experince_letter
              }
              onChange={(e) => handleFileChange(e, 'experince_letter')}
            />
            <DocumentCard
              label='Additional Documents'
              sub='Any other relevant certs'
              isUploaded={
                !!files.additional_documents ||
                !!counsellorData.documents?.additional_documents
              }
              onChange={(e) => handleFileChange(e, 'additional_documents')}
            />
          </div>
        </section>

        {/* ================= SUBMIT ================= */}
        <div className='flex justify-end pt-4 pb-12'>
          <button
            type='submit'
            disabled={saving}
            className='px-8 py-3 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all'
          >
            {saving ? 'Saving Changes...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CounsellorSettings;
