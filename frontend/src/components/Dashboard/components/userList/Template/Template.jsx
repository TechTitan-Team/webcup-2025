import React, { useState } from 'react';

const Templates = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    return (
        <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center'>
                    <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-blue-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                            />
                        </svg>
                    </div>
                    <h2 className='text-lg font-semibold text-gray-800'>
                        Rapports
                    </h2>
                </div>
            </div>
            <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50'>
                    <div className='flex items-center'>
                        <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 text-blue-500'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                                />
                            </svg>
                        </div>
                        <div>
                            <p className='text-sm font-medium text-gray-800'>
                                Une douche cassée dans la chambre numéro 135...
                            </p>
                            <p className='text-xs text-gray-500'>
                                Il y a 1 minute
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50'>
                    <div className='flex items-center'>
                        <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 text-blue-500'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                                />
                            </svg>
                        </div>
                        <div>
                            <p className='text-sm font-medium text-gray-800'>
                                Une douche cassée dans la chambre numéro 135...
                            </p>
                            <p className='text-xs text-gray-500'>
                                Il y a 1 minute
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50'>
                    <div className='flex items-center'>
                        <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 text-blue-500'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                                />
                            </svg>
                        </div>
                        <div>
                            <p className='text-sm font-medium text-gray-800'>
                                Une douche cassée dans la chambre numéro 135...
                            </p>
                            <p className='text-xs text-gray-500'>
                                Il y a 1 minute
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button className='text-blue-500 text-sm mt-4'>
                        Voir tout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Templates;
