import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUserInfo } from '../hooks/useUserInfo'
import axiosConfig from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import IncomeList from '../components/IncomeList';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';
import IncomeOverview from '../components/IncomeOverview';

const Income = () => {
    useUserInfo();

    const [income, setIncome] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addIncomeModal, setAddIncomeModal] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200) {
                console.log('Income list', response.data);
                setIncome(response.data);
            }
        }catch(error) {
            console.error('Failed to fetch income details:', error);
            toast.error( error.response?.data?.message || "Failed to fetch income details");
        }finally {
            setLoading( false);
        }
    }

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                console.log('Income categories', response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch income categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income categories");
        }
    };

    const handleAddIncome = async (income) => { 
        const {name, amount, date, icon, categoryId} = income;
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
            const response  = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name, amount: Number(amount), date, icon, categoryId,
            })
            if (response.status === 201) {
                setAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.error('Failed to add income:', error);
            toast.error(error.response?.data?.message || "Failed to add income");
        }
    }

    const deleteIncome = async (incomeId) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId));
            setDeleteAlert({show: false, data: null});
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error('Failed to delete income:', error);
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className='flex justify-end'>
                        <button 
                            onClick={() => setAddIncomeModal(true)}
                            type="button" className='modal-btn' 
                        >
                            <Plus size={15} className="text-lg" /> Add Income
                        </button>
                    </div>
                    <IncomeOverview transactions={income} />

                    <IncomeList 
                        transactions={income} 
                        onDelete={(id) => setDeleteAlert({show: true, data: id})}
                    />

                    <Modal
                        isOpen={addIncomeModal}
                        onClose={() => setAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm 
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    <Modal
                        isOpen={deleteAlert.show}
                        onClose={() => setDeleteAlert({show: false, data: null})}
                        title="Delete Income! Are you sure?"
                    >
                        <DeleteAlert 
                            content="Are you sure you want to delete this income?"
                            onDelete={() => deleteIncome(deleteAlert.data)}
                        />
                        
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Income