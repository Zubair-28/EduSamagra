import axiosInstance from './axiosInstance';

export const login = async (email, password) => {
    const response = await axiosInstance.post('/login', { email, password });
    const { access_token, role } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user_role', role);
    return { role };
};

export const signup = async (email, password, role, fullName) => {
    // Demo: All signups (except admin) are assigned to institution 1
    const institutionId = role === 'admin' ? null : 1;
    await axiosInstance.post('/signup', { email, password, role, fullName, institutionId });
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
};