import React from 'react'
import { Download, Mail } from 'lucide-react'
import TransactionInfo from './TransactionInfo'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete}) => {
    return (
        <div className="card card-hover">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button className="card-btn">
                        <Mail size={15} className="text-base" />Email
                    </button>
                    <button className="card-btn">
                        <Download size={15} className="text-base" />Download
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((expense) => (
                    <TransactionInfo
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format('Do MMM YYYY')}
                        amount={expense.amount}
                        type='expense'
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList