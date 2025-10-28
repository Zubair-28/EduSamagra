import axiosInstance from './axiosInstance';

export const adminAPI = {
    getUsers: () => axiosInstance.get('/admin/users'),
    getInstitutions: () => axiosInstance.get('/admin/institutions'),
    addInstitution: (data) => axiosInstance.post('/admin/institutions', data),
    // Add update/delete functions as needed
};