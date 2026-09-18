import React, { useState } from 'react'
import Input from './Input'
import { LoaderCircle } from 'lucide-react';
import EmojiPopUp from './EmojiPopUp';

const AddIncomeForm = ({onAddIncome, categories}) => {
    const [loading, setLoading] = useState(false);

    const [income, setIncome] = useState({
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
        setIncome({ ...income, [key]: value });
    }

    const handleAddIncome = async () => {
        setLoading(true);
        try{
            await onAddIncome(income);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div>
            <EmojiPopUp 
                icon={income.icon}
                onSelect={(emoji) => handleChange('icon', emoji)}
            />
            <Input
                value={income.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Income Source"
                placeholder="e.g., Salary, Freelance, Bonus"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                value={income.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddIncome}
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
                            Add Income
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm