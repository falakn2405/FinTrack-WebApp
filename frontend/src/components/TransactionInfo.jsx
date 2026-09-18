import React from 'react'
import {
    ArrowDownRight,
    ArrowUpRight,
    Trash2,
    UtensilsCrossed
} from 'lucide-react';
import { addThounandSeparator } from '../utils/thousandSeparator';

const TransactionInfo = ({
    icon,
    title,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete
}) => {
    const isIncome = type === 'income';

    return (
        <div className="group flex min-w-0 items-center gap-3 rounded-xl px-2 py-3 transition-all duration-200 hover:bg-slate-50 sm:gap-4 sm:px-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                isIncome
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-blue-50 text-blue-600'
            }`}>
                {icon ? (
                    <span className="text-xl leading-none">{icon}</span>
                ) : (
                    <UtensilsCrossed size={19} />
                )}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                        {title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-400">
                        {date}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            type="button"
                            onClick={onDelete}
                            aria-label={`Delete ${title || 'transaction'}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 opacity-100 transition-all hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}

                    <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 ${
                        isIncome
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                    }`}>
                        <span className="whitespace-nowrap text-xs font-semibold sm:text-sm">
                            {isIncome ? '+' : '-'}${addThounandSeparator(amount)}
                        </span>

                        {isIncome ? (
                            <ArrowUpRight size={14} strokeWidth={2.2} />
                        ) : (
                            <ArrowDownRight size={14} strokeWidth={2.2} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfo
