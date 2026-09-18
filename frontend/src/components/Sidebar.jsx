import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { User } from 'lucide-react';
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({activeMenu, mobile = false, onNavigate}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        onNavigate?.();
    };

    return (
        <div className={`${mobile ? "w-full" : "w-64 h-[calc(100vh-73px)] sticky top-[73px]"} bg-white border-r border-slate-200/80 p-4`}>
            <div className="mb-6 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                    {user?.profileImgUrl ? (
                        <img src={user.profileImgUrl} alt="profile" className="h-11 w-11 rounded-xl object-cover ring-2 ring-white" />
                    ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><User size={22} /></div>
                    )}
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{user ? `${user.firstName} ${user.lastName}` : ""}</p>
                        <p className="mt-0.5 text-xs text-slate-400">Personal account</p>
                    </div>
                </div>
            </div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Menu</p>
            <nav className="space-y-1.5">
                {SIDE_BAR_DATA.map((item, index) => {
                    const active = activeMenu === item.label;
                    return (
                        <button onClick={() => handleNavigate(item.path)} key={`menu_${index}`}
                            className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200/70" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>
                            <item.icon size={19} className={active ? "text-white" : "text-slate-500 group-hover:text-slate-900"} />
                            <span>{item.label}</span>
                            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" />}
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}

export default Sidebar
