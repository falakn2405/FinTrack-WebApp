import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'

const DeleteAlert = ({content, onDelete}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try{
            await onDelete();
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-gray-700">{content}</p>
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleDelete}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all
                    ${
                        loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                    }`}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Deleting...
                        </>
                    ): (
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert