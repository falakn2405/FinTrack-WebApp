import React from 'react'
import { Download, Mail } from 'lucide-react'
import TransactionInfo from './TransactionInfo'
import moment from 'moment'

const IncomeList = ({transactions, onDelete}) => {
    return (
        <div className="card card-hover">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transactions?.map((income) => (
                    <TransactionInfo 
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type='income'
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList