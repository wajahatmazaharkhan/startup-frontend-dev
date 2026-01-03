import { toast } from 'react-toastify';
import { asyncHandler } from '../utils/async-handler';
import api from './apiClient';
import { useAuthStore } from '../store/auth-store';

export const slugService = asyncHandler(async (slug) => {
  const res = await api.get(`/api/service/getbyslug/${slug}`);
  console.log(res.data)
  return res.data;
});

export const counsellorService = asyncHandler(async (slug) => {
  const res = await api.get(`/api/counsellor/getcounsellorbyslug/${slug}`);
  console.log(res.data)
  return res.data;
});

export const cousellorServiceByEmail = asyncHandler(async (email) => {
  const res = await api.get(`/api/counsellor/getcounsellorbyemail/${email}`);
  console.log(res.data);
  return res.data ;
})
