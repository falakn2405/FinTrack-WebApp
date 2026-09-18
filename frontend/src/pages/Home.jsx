import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUserInfo } from '../hooks/useUserInfo'
import FinancialOverview from '../components/FinancialOverview'
import {
    ArrowDownRight,
    ArrowUpRight,
    BanknoteX,
    CalendarDays,
    CircleDollarSign,
    PiggyBank,
    Plus,
    RefreshCw,
    Wallet,
} from 'lucide-react'
import { addThounandSeparator } from '../utils/thousandSeparator'
import { useNavigate } from 'react-router-dom'
import axiosConfig from '../config/axiosConfig'
import { API_ENDPOINTS } from '../config/apiEndpoints'
import { toast } from 'react-toastify'
import RecentTransactions from '../components/RecentTransactions'

const SummaryCard = ({ icon, label, value, type, helper }) => {
    const styles = {
        balance: {
            icon: 'bg-blue-50 text-blue-600 ring-blue-100',
            badge: 'bg-blue-50 text-blue-700',
        },
        income: {
            icon: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
            badge: 'bg-emerald-50 text-emerald-700',
        },
        expense: {
            icon: 'bg-rose-50 text-rose-600 ring-rose-100',
            badge: 'bg-rose-50 text-rose-700',
        },
    }

    const current = styles[type]

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${current.icon}`}>
                    {React.cloneElement(icon, { size: 21, strokeWidth: 2 })}
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${current.badge}`}>
                    {helper}
                </span>
            </div>

            <div className="mt-5">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                    ${addThounandSeparator(value || 0)}
                </h3>
            </div>

            <div className="pointer-events-none absolute -bottom-12 -right-10 h-28 w-28 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-125" />
        </div>
    )
}

const Home = () => {
    useUserInfo()

    const navigate = useNavigate()
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchDashboardData = async () => {
        if (loading) return
        setLoading(true)

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASBOARD_DATA)
            if (response.status === 200) {
                setDashboardData(response.data)
            }
        } catch (error) {
            console.error('Something went wrong.', error)
            toast.error('Could not fetch the dashboard data.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const totalBalance = dashboardData?.totalBalance || 0
    const totalIncome = dashboardData?.totalIncomes || 0
    const totalExpenses = dashboardData?.totalExpenses || 0
    const savingsRate = totalIncome > 0
        ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100)
        : 0

    const today = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date())

    return (
        <Dashboard activeMenu="Dashboard">
            <main className="min-h-screen bg-slate-50/70 px-1 py-5 sm:px-2 lg:px-3">
                <div className="mx-auto max-w-[1500px] space-y-6">
                    {/* Dashboard header */}
                    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                                <CalendarDays size={14} />
                                <span>{today}</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Financial Dashboard
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Here’s a quick overview of your money today.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={fetchDashboardData}
                                disabled={loading}
                                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                                Refresh
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/income')}
                                className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                <Plus size={17} />
                                Add Income
                            </button>
                        </div>
                    </section>

                    {/* Main financial KPIs */}
                    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <SummaryCard
                            icon={<PiggyBank />}
                            label="Total Balance"
                            value={totalBalance}
                            type="balance"
                            helper="Available"
                        />
                        <SummaryCard
                            icon={<Wallet />}
                            label="Total Income"
                            value={totalIncome}
                            type="income"
                            helper="Money in"
                        />
                        <SummaryCard
                            icon={<BanknoteX />}
                            label="Total Expenses"
                            value={totalExpenses}
                            type="expense"
                            helper="Money out"
                        />
                    </section>

                    {/* Small insight strip */}
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <CircleDollarSign size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500">Savings rate</p>
                                <p className="mt-0.5 text-lg font-bold text-slate-900">{savingsRate.toFixed(1)}%</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <ArrowUpRight size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500">Income</p>
                                <p className="mt-0.5 text-sm font-semibold text-slate-900">Cash coming in</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                                <ArrowDownRight size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500">Expenses</p>
                                <p className="mt-0.5 text-sm font-semibold text-slate-900">Track your spending</p>
                            </div>
                        </div>
                    </section>

                    {/* Transactions + overview */}
                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm [&>div]:!border-0 [&>div]:!shadow-none">
                            <RecentTransactions
                                transactions={dashboardData?.recentTransaction}
                                onMore={() => navigate('/expense')}
                            />
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm [&>div]:!border-0 [&>div]:!shadow-none">
                            <FinancialOverview
                                totalBalance={totalBalance}
                                totalIncomes={totalIncome}
                                totalExpenses={totalExpenses}
                            />
                        </div>
                    </section>
                </div>
            </main>
        </Dashboard>
    )
}

export default Home
