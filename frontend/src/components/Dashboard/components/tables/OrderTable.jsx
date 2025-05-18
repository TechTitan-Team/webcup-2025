import React from 'react';

const OrderTable = () => {
    const orders = [
        {
            id: '#00052',
            product: 'iPhone 14',
            date: '01 Jan 2023',
            status: 'En attente',
            tracking: 'SR002IP',
        },
        {
            id: '#05134',
            product: 'Macbook Air',
            date: '03 Jan 2023',
            status: 'Livré',
            tracking: 'PQ1132G',
        },
    ];

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>Dernières Commandes</h2>
                <button className='flex items-center space-x-1 border border-gray-300 rounded-lg px-3 py-1'>
                    <span className='text-sm'>Hebdomadaire</span>
                    <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                        />
                    </svg>
                </button>
            </div>

            <table className='w-full'>
                <thead>
                    <tr className='text-left text-gray-600'>
                        <th className='pb-3 font-medium'>ID Client</th>
                        <th className='pb-3 font-medium'>Produit</th>
                        <th className='pb-3 font-medium'>Date</th>
                        <th className='pb-3 font-medium'>Statut</th>
                        <th className='pb-3 font-medium'>Suivi</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className='border-t border-gray-100'>
                            <td className='py-4 text-gray-500'>{order.id}</td>
                            <td className='py-4'>{order.product}</td>
                            <td className='py-4 text-gray-500'>{order.date}</td>
                            <td
                                className={`py-4 ${
                                    order.status === 'En attente'
                                        ? 'text-yellow-500'
                                        : 'text-green-500'
                                }`}
                            >
                                {order.status}
                            </td>
                            <td className='py-4 text-gray-500'>
                                {order.tracking}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
