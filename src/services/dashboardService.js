import { toast } from 'react-toastify';
import { asyncHandler } from '../utils/async-handler';
import api from './apiClient';
import { useAuthStore } from '../store/auth-store';

export const slugService = asyncHandler(async (slug) => {
  const res = await api.get(`/api/service/getbyslug/${slug}`);
  console.log(res.data);
  return res.data;
});

export const counsellorService = asyncHandler(async (slug) => {
  const res = await api.get(`/api/counsellor/getcounsellorbyslug/${slug}`);
  console.log(res.data);
  return res.data;
});

export const cousellorServiceByEmail = asyncHandler(async (email) => {
  const res = await api.get(`/api/counsellor/getcounsellorbyemail/${email}`);
  console.log(res.data);
  return res.data;
});

export const counsellorById = asyncHandler(async (id) => {
  const res = await api.get(`/api/counsellor/get/${id}`);
  console.log(res);
  return res.data;
});


export const getAllServices = asyncHandler(async () => {
  const res = await api.get(`/api/service/getall/users`);
  return res.data;
}
)

/**
 * @param {string} email - Counsellor email
 * @returns {Promise<Object>} Counsellor data
 */
export const getCounsellorByEmail = asyncHandler(async (email) => {
  const res = await api.get(`/api/counsellor/getcounsellorbyemail/${email}`);
  return res.data;
});

/**
 * Update counsellor profile
 * @param {string} email - Counsellor email
 * @param {Object} updates - Profile updates
 * @returns {Promise<Object>} Updated counsellor data
 */
export const updateCounsellorProfile = asyncHandler(async (updates) => {
  const res = await api.put(`/api/counsellor/update`, updates);
  return res.data;
});
