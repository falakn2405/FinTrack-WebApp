import { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const MenuBar = ({activeMenu}) => {
    const [sideMenu, setSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const {user, clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
        };
        if (showDropdown) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    return (
        <>
            <header className="sticky top-0 z-30 flex h-[73px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-7">
                <div className="flex items-center gap-3">
                    <button onClick={() => setSideMenu(!sideMenu)} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 lg:hidden">
                        {sideMenu ? <X size={21} /> : <Menu size={21} />}
                    </button>
                    <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
                        <img src={assets.logo} alt="FinTrack logo" className="h-10 w-10 object-contain" />
                        <div className="text-left">
                            <span className="block text-lg font-bold tracking-tight text-slate-950">FinTrack</span>
                            <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400 sm:block">Personal Finance</span>
                        </div>
                    </button>
                </div>
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 transition hover:bg-slate-50">
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-blue-50 text-blue-600">
                            {user?.profileImgUrl ? <img src={user.profileImgUrl} alt="profile" className="h-full w-full object-cover" /> : <User size={17} />}
                        </div>
                        <div className="hidden text-left sm:block">
                            <p className="max-w-28 truncate text-xs font-semibold text-slate-800">{user?.firstName}</p>
                            <p className="text-[10px] text-slate-400">My account</p>
                        </div>
                        <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                            <div className="border-b border-slate-100 p-4">
                                <p className="truncate text-sm font-semibold text-slate-900">{user ? `${user.firstName} ${user.lastName || ""}` : ""}</p>
                                <p className="mt-1 truncate text-xs text-slate-500">{user?.email}</p>
                            </div>
                            <div className="p-2">
                                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"><LogOut size={17} />Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            {sideMenu && (
                <div className="fixed inset-x-0 top-[73px] z-20 max-h-[calc(100vh-73px)] overflow-y-auto border-b border-slate-200 bg-white shadow-xl lg:hidden">
                    <Sidebar activeMenu={activeMenu} mobile onNavigate={() => setSideMenu(false)} />
                </div>
            )}
        </>
    )
}

export default MenuBar;
