import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUserInfo } from '../hooks/useUserInfo'
import { Plus } from 'lucide-react';
import CategoryList from '../components/CategoryList';
import axiosConfig from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import Modal from '../components/Modal';
import AddCategoryForm from '../components/AddCategoryForm';
import { toast } from 'react-toastify';

const Category = () => {
    useUserInfo();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;
        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200) {
                console.log('Categories', response.data);
                setCategories(response.data);
            }
        } catch(error) {
            console.error('Something went wrong. Please try again.', error);
        } finally{
            setLoading(false);
        }
    }

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        const isDuplicate = categories.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        });

        if (isDuplicate) {
            toast.error("Category Name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,
                { name, type, icon }
            );
            if (response.status === 201) {
                toast.success("Category added successfully");
                setAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (err) {
            console.error("Failed to add category", err);
            toast.error(err.response?.data?.message || "Failed to add category.");
        }
    };

    const handleEditCategory = (category) => {
        console.log('Edit Category', category);
        setSelectedCategory(category);
        setEditCategoryModal(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const { id, name, type, icon } = updatedCategory;

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }
        if (!id) {
            toast.error("Invalid category selected");
            return;
        }
        try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(selectedCategory.id),
                { name, type, icon }
            );
            setEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        }catch(err) {
            toast.error(err.response?.data?.message || "Failed to update category.");
            console.error("Failed to update category", err);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    return (
        <Dashboard activeMenu="Category">
            <div className='my-5 mx-auto'>
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button 
                        onClick={() => setAddCategoryModal(true)}
                        type="button"
                        className="modal-btn"
                    >
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>
                <CategoryList categories={categories} onEditCategory={handleEditCategory} />

                <Modal
                    isOpen={addCategoryModal}
                    onClose={() => setAddCategoryModal(false)}
                    title='Add Category'
                >
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>

                <Modal
                    onClose={() =>{
                        setEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    isOpen = {editCategoryModal}
                    title="Update Category"
                >
                    <AddCategoryForm
                        initialCategory={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Category