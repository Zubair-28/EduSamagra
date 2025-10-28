import axiosInstance from './axiosInstance';

const getDashboardData = (role) => {
    return axiosInstance.get(`/${role}/dashboard`);
};

export const dashboardAPI = {
    getDashboardData,
};