import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options}) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const toggleVisibility = () => setShowPassword(!showPassword);
    const inputType = (type === "password" && showPassword) ? "text" : type;

    return (
        <div className="mb-4 w-full">
            {label && (
                <label className="text-[13px] font-medium text-slate-800 block mb-1" >
                    {label}
                </label>
            )}
            <div className="relative">
                {isSelect ? (
                    <select
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
                        value={value}
                        onChange={(e) => onChange(e)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={inputType}
                        value={value}
                        onChange={(e) => onChange(e)}
                        placeholder={placeholder}
                        className="w-full bg-transparent border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                )}
                
                {type === "password" && (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

Input.displayName = "Input";

export default Input;