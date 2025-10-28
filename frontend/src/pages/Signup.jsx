import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/authAPI';
import signupIllustration from '../assets/signup_illustration.png'; // <--- IMPORTANT: Update path if your image name is different

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(email, password, role, fullName);
            navigate('/login?signup=success'); // Redirect to login with success message
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to sign up. Please try again.');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'linear-gradient(to right top, #6dd5ed, #2193b0)', backgroundSize: 'cover' }}>
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[700px]">

                {/* Left Section: Illustration and Marketing Text */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-500 to-teal-400 text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Join EduSamagra
                    </h2>
                    <p className="mt-4 text-lg md:text-xl max-w-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Start Your Learning Journey Today
                    </p>
                    <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <img src={signupIllustration} alt="Learning Journey" className="max-w-xs md:max-w-md mx-auto h-auto" />
                    </div>
                </div>

                {/* Right Section: Signup Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        CREATE ACCOUNT
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Full Name Input */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800 transition-all duration-200"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>

                        {/* Email Input */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800 transition-all duration-200"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6h.01M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2m-2 4v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path></svg>
                        </div>

                        {/* Password Input */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800 transition-all duration-200"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>

                        {/* Role Select */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none transition-all duration-200"
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="institution">Institution</option>
                                <option value="admin">Admin</option>
                            </select>
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-4v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2H0V7a4 4 0 014-4h16a4 4 0 014 4v13h-7V20zm-7-2a2 2 0 10-4 0 2 2 0 004 0zM17 8a2 2 0 10-4 0 2 2 0 004 0zM7 4h10V3a1 1 0 10-2 0v1h-6V3a1 1 0 10-2 0v1H7z"></path></svg>
                            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>

                        {error && <p className="mt-4 text-center text-sm text-red-600 animate-fade-in-up">{error}</p>}

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-6 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 transition-all duration-200 animate-fade-in-up"
                            style={{ animationDelay: '900ms' }}
                        >
                            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;