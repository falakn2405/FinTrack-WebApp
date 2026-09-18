import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../components/Input';
import { validateEmail } from '../utils/validation';
import axiosConfig from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { Loader2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useLocation } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setUser} = useContext(AppContext);
    const location = useLocation();
    const message = location.state?.message;

    const navigate = useNavigate();

    const fields = [
        { value: email, message: "Please enter your email" },
        { value: password, message: "Please enter your password" }
    ];

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (loading) return;

        setError("");
        if (fields.every(field => !field.value.trim())) {
            return setError("Please enter your details");
        }

        for (const field of fields) {
            if (!field.value.trim()) {
                return setError(field.message);
            }
        }

        if (!validateEmail(email)) {
            return setError("Please enter a valid email address");
        }

        console.log({ email, password });

        try{
            setLoading(true);
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });
            const {token, user} = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard", {
                    state: {
                        message: "Login successfully. Welcome to FinTrack."
                    }
                });
            }
        } catch(error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error("Error occurred while logging in:", error);
                setError("An error occurred while login. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                    
            <img src={assets.signup_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
            
            <div className="relative z-10 w-full max-w-lg px-6">
            
                <div className="bg-white bg-opacity-95 border-2 border-blue-400 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back!
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Log in and stay in control of your finances.
                    </p>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded text-sm text-center">
                                {message}
                            </div>
                        )}
                        <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="Enter email address"
                            type="text"
                            disabled={loading}
                        />
                        <Input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            disabled={loading}
                        />
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2 ${
                                loading 
                                    ? "bg-blue-400 cursor-not-allowed" 
                                    : "bg-blue-500 hover:bg-blue-700"
                            }`}
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
    
                            {loading ? "Loggin In..." : "LOGIN"}
                        </button>
                        
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Signup</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login