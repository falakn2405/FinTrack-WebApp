import React, { useState } from 'react'
import Input from './Input'
import { LoaderCircle } from 'lucide-react';
import EmojiPopUp from './EmojiPopUp';

const AddExpenseForm = ({onAddExpense, categories}) => {
    const [loading, setLoading] = useState(false);

    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    })

    const categoryOptions = [
        { value: "", label: "Select Category" },
            ...categories.map(category => ({
                value: category.id,
                label: category.name
        }))
    ];

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    }

    const handleAddExpense = async () => {
        setLoading(true);
        try{
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <EmojiPopUp 
                icon={expense.icon}
                onSelect={(emoji) => handleChange('icon', emoji)}
            />
            <Input
                value={expense.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Expense Source"
                placeholder="e.g., Food, Transport, Shopping"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                value={expense.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 50.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddExpense}
                    className="form-btn"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Adding...
                        </>
                    ): (
                        <>
                            Add Expense
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm