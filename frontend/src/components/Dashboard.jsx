import React, { useContext } from 'react'
import MenuBar from './MenuBar'
import { AppContext } from '../context/AppContext';
import Sidebar from './Sidebar';

const Dashboard = ({children, activeMenu}) => {
    const { user } = useContext(AppContext);

    return (
        <div className="min-h-screen bg-slate-50">
            <MenuBar activeMenu={activeMenu} />
            {user && (
                <div className="flex">
                    <aside className="hidden lg:block shrink-0">
                        <Sidebar activeMenu={activeMenu} />
                    </aside>
                    <main className="min-w-0 flex-1">
                        <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
}

export default Dashboard
