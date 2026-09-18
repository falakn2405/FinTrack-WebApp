import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUserInfo } from '../hooks/useUserInfo'
import axiosConfig from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import ExpenseList from '../components/ExpenseList';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import AddExpenseForm from '../components/AddExpenseForm';
import DeleteAlert from '../components/DeleteAlert';
import ExpenseOverview from '../components/ExpenseOverview';

const Expense = () => {
    useUserInfo();

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addExpenseModal, setAddExpenseModal] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchExpenseDetails = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if(response.status === 200) {
                console.log('Expense list', response.data);
                setExpenses(response.data);
            }
        }catch(error) {
            console.error('Failed to fetch expense details:', error);
            toast.error( error.response?.data?.message || "Failed to fetch expense details");
        }finally {
            setLoading( false);
        }
    }

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                console.log('Expense categories', response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch expense categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;
        const today = new Date().toISOString().split('T')[0];

        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }
        if (!date) {
            toast.error("Please select a date")
            return;
        }
        if(date > today) {
            toast.error('Date cannot be in future');
            return;
        }
        if (!categoryId || categoryId === "") {
            toast.error('Please select a category');
            return;
        }

        try{
            const response  = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name, amount: Number(amount), date, icon, categoryId,
            })
            if (response.status === 201) {
                setAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.error('Failed to add expense:', error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    }

    const deleteExpense = async (expenseId) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId));
            setDeleteAlert({show: false, data: null});
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error('Failed to delete expense:', error);
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setAddExpenseModal(true)}
                            type="button" className='modal-btn'
                        >
                            <Plus size={15} className="text-lg" /> Add Expense
                        </button>
                    </div>
                    <ExpenseOverview transactions={expenses} />

                    <ExpenseList
                        transactions={expenses}
                        onDelete={(id) => setDeleteAlert({show: true, data: id})}
                    />

                    <Modal
                        isOpen={addExpenseModal}
                        onClose={() => setAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>

                    <Modal
                        isOpen={deleteAlert.show}
                        onClose={() => setDeleteAlert({show: false, data: null})}
                        title="Delete Expense! Are you sure?"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense?"
                            onDelete={() => deleteExpense(deleteAlert.data)}
                        />

                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Expense