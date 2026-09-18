import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const FinancialOverview = ({ totalBalance, totalIncomes, totalExpenses }) => {
    const data = [
        { name: 'Balance', value: Math.max(totalBalance || 0, 0), fill: '#2563eb' },
        { name: 'Expenses', value: Math.max(totalExpenses || 0, 0), fill: '#f43f5e' },
        { name: 'Income', value: Math.max(totalIncomes || 0, 0), fill: '#10b981' },
    ];
    const isEmpty = data.every(item => item.value === 0);
    const formatMoney = (value) => `$${Number(value || 0).toLocaleString('en-IN')}`;

    return (
        <section className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div>
                <h5 className="text-base font-semibold text-slate-900 sm:text-lg">Financial Overview</h5>
                <p className="mt-1 text-xs text-slate-400">Balance, income and expense distribution</p>
            </div>
            {isEmpty ? <div className="flex min-h-[310px] items-center justify-center"><p className="text-sm text-slate-400">No financial data available</p></div> : (
                <>
                    <div className="relative mt-2 flex min-h-[270px] items-center justify-center">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={78} outerRadius={105} paddingAngle={3} cornerRadius={6} stroke="none">
                                    {data.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip formatter={(value, name) => [formatMoney(value), name]} contentStyle={{backgroundColor:'#fff',border:'1px solid #e2e8f0',borderRadius:'12px',boxShadow:'0 10px 25px rgba(15,23,42,.08)'}} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute text-center">
                            <p className="text-xs font-medium text-slate-400">Available balance</p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{formatMoney(totalBalance)}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                        {data.map((item) => (
                            <div key={item.name} className="min-w-0 text-center">
                                <div className="mb-1.5 flex items-center justify-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} /><span className="truncate text-xs font-medium text-slate-500">{item.name}</span></div>
                                <p className="truncate text-xs font-semibold text-slate-800 sm:text-sm">{formatMoney(item.value)}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default FinancialOverview;
