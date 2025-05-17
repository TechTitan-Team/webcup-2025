import React from 'react';
import {
    BanknotesIcon,
    Squares2X2Icon,
    ShoppingCartIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import StatCard from './ StatCard';

const StatCards = () => {
    const stats = [
        {
            title: 'Total Revenue',
            value: '$513',
            change: 12,
            icon: BanknotesIcon,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-500',
        },
        {
            title: 'Total Transaction',
            value: '321',
            change: 8,
            icon: ShoppingCartIcon,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-500',
        },
        {
            title: 'Total Products',
            value: '564',
            change: 13,
            icon: Squares2X2Icon,
            iconBg: 'bg-red-100',
            iconColor: 'text-red-500',
        },
        {
            title: 'Total Customer',
            value: '254',
            change: -4,
            icon: UsersIcon,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-500',
        },
    ];

    return (
        <div className='grid grid-cols-4 gap-6'>
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatCards;
