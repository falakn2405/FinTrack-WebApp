import React from 'react'

const InfoCard = ({icon, label, value, color = "bg-blue-600"}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-110" />
            <div className="relative flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                        {value?.toString().startsWith('$') ? value : `$${value}`}
                    </p>
                </div>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${color}`}>
                    {React.isValidElement(icon) ? React.cloneElement(icon, { size: 22, strokeWidth: 2 }) : icon}
                </div>
            </div>
        </div>
    )
}

export default InfoCard
