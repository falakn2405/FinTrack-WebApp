import React, { useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { get7DayIncomeData, get30DayIncomeData, getYearlyIncomeData } from '../utils/incomeUtils'

const IncomeOverview = ({ transactions }) => {
    const [range, setRange] = useState('7d')

    const getData = () => {
        switch (range) {
            case '30d':
                return get30DayIncomeData(transactions)
            case 'year':
                return getYearlyIncomeData(transactions)
            default:
                return get7DayIncomeData(transactions)
        }
    }

    const data = getData()

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
      
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold text-gray-800">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-1">
                        Track your earnings over time
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {['7d', '30d', 'year'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setRange(item)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200
                                ${
                                range === item
                                    ? 'bg-white text-green-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {item.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="mt-6 w-full h-64 min-h-62.5">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>

                        {/* Gradient */}
                        <defs>
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        {/* Grid */}
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

                        {/* X Axis */}
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                        />

                        {/* Y Axis */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            tickFormatter={(v) => `$${v}`}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                borderRadius: '10px',
                                border: 'none',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            }}
                            formatter={(value) => [
                                `$${Number(value).toLocaleString()}`,
                                'Income',
                            ]}
                            labelStyle={{ color: '#6b7280', fontSize: '12px' }}
                        />

                        {/* Area */}
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            fill="url(#incomeGradient)"
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default IncomeOverview