import React from 'react'
import { ArrowRight, ReceiptText } from 'lucide-react'
import TransactionInfo from './TransactionInfo'
import moment from 'moment'

const RecentTransactions = ({transactions, onMore}) => {
    const recent = transactions?.slice(0,5) || [];
    return (
        <section className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Recent Transactions</h4>
                    <p className="mt-1 text-xs text-slate-400">Your latest income and expenses</p>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50" onClick={onMore}>View all <ArrowRight size={15} /></button>
            </div>
            {recent.length ? (
                <div className="mt-5 divide-y divide-slate-100">
                    {recent.map(item => (
                        <div key={item.id} className="py-1 first:pt-0 last:pb-0">
                            <TransactionInfo title={item.name} icon={item.icon} date={moment(item.date).format('Do MMM YYYY')} amount={item.amount} type={item.type} hideDeleteBtn />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><ReceiptText size={22} /></div>
                    <p className="mt-3 text-sm font-medium text-slate-700">No transactions yet</p>
                    <p className="mt-1 text-xs text-slate-400">Your recent activity will appear here.</p>
                </div>
            )}
        </section>
    )
}

export default RecentTransactions
