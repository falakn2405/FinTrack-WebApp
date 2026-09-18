import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../components/Input';
import { validateEmail } from '../utils/validation';
import axiosConfig from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { Loader2 } from 'lucide-react';
import ImageSelector from '../components/ImageSelector';
import uploadProfileImg from '../utils/uploadProfileImg';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();

    const fields = [
        { value: firstName, message: "Please enter your first name" },
        { value: lastName, message: "Please enter your last name" },
        { value: email, message: "Please enter your email" },
        { value: password, message: "Please enter your password" }
    ];

    const handleSubmit = async(e) => {
        e.preventDefault();
        let profileImgUrl = "";
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

        console.log({ firstName, lastName, email, password });

        try{
            setLoading(true);
            if(profileImage) {
                const imageUrl = await uploadProfileImg(profileImage);
                profileImgUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                firstName,
                lastName,
                email,
                password,
                profileImgUrl
            });
            if (response.status === 201) {
                navigate("/login", {
                    state: {
                        message: "Account created successfully. Please check your email to activate your account before logging in."
                    }
                });
            }
        } catch(error) {
            console.error("Error occurred while signing up:", error);
            setError("An error occurred while signing up. Please try again.");
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
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with FinTrack.
                    </p>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='flex justify-center mb-6'>
                            <ImageSelector image={profileImage} setImage={setProfileImage} />
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                            <Input 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                label="First Name"
                                placeholder="Enter first name"
                                type="text"
                                disabled={loading}
                            />
                            <Input 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                label="Last Name"
                                placeholder="Enter last name"
                                type="text"
                                disabled={loading}
                            />
                            <div className='col-span-2'>
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
                            </div>
                        </div>
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
    
                            {loading ? "Signing up..." : "SIGN UP"}
                        </button>
                        
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Signup