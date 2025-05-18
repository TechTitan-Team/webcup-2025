import React from 'react';

const RecentSales = () => {
    const sales = [
        {
            date: '01 Fév 2023',
            name: 'Robert',
            amount: '50,82 €',
        },
        {
            date: '03 Fév 2023',
            name: 'Smith',
            amount: '76,53 €',
        },
    ];

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>
                    Ventes Récentes
                </h2>
                <button className='text-sm text-blue-500'>Voir Détails</button>
            </div>

            <table className='w-full'>
                <thead>
                    <tr className='text-left text-gray-600'>
                        <th className='pb-3 font-medium'>Date</th>
                        <th className='pb-3 font-medium'>Nom</th>
                        <th className='pb-3 font-medium'>Montant</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr key={index} className='border-t border-gray-100'>
                            <td className='py-4 text-gray-500'>{sale.date}</td>
                            <td className='py-4'>{sale.name}</td>
                            <td className='py-4 font-medium'>{sale.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentSales;
