import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api/authAPI';
import loginIllustration from '../assets/online_education_illustration.png'; // <--- IMPORTANT: Update path if your image name is different

const Login = () => {
    const [email, setEmail] = useState(''); // Empty by default now
    const [password, setPassword] = useState(''); // Empty by default now
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        // Show success message if redirected from signup
        if (location.search.includes('signup=success')) {
            setError('Account created successfully! Please log in.'); // Using error state for success here temporarily
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { role } = await login(email, password);
            navigate(`/dashboard/${role}`);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to log in. Please check your credentials.');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: 'linear-gradient(to right top, #ff7e5f, #feb47b)', backgroundSize: 'cover' }}>
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[700px]"> {/* Adjusted height */}

                {/* Left Section: Illustration and Marketing Text */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-pink-500 to-red-400 text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        EduSamagra
                    </h2>
                    <p className="mt-4 text-lg md:text-xl max-w-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Your Unified Education Platform
                    </p>
                    <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <img src={loginIllustration} alt="Online Education" className="max-w-xs md:max-w-md mx-auto h-auto" />
                    </div>
                </div>

                {/* Right Section: Login Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        USER LOGIN
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                            <input
                                type="email"
                                placeholder="Username (Email)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500 text-gray-800 transition-all duration-200"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>

                        {/* Password Input */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500 text-gray-800 transition-all duration-200"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="font-medium text-pink-600 hover:text-pink-500 transition-colors duration-200">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-6 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-400 transition-all duration-200 animate-fade-in-up"
                            style={{ animationDelay: '800ms' }}
                        >
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                        </button>
                    </form>

                    {error && <p className="mt-4 text-center text-sm text-red-600 animate-fade-in-up">{error}</p>}

                    {/* Create Account Link */}
                    <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '900ms' }}>
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <a href="/signup" className="font-medium text-pink-600 hover:text-pink-500 transition-colors duration-200">
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;