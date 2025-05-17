import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const StatCard = ({ title, value, change, icon: Icon, iconBg, iconColor }) => {
    const isPositive = change >= 0;

    return (
        <div className='bg-white rounded-lg p-6 shadow-sm flex items-center'>
            <div className={`${iconBg} p-3 rounded-full mr-4`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
                <h2 className='text-2xl font-bold'>{value}</h2>
                <div className='flex items-center'>
                    <p className='text-gray-500'>{title}</p>
                    <div
                        className={`ml-2 flex items-center ${
                            isPositive ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {isPositive ? (
                            <ArrowUpIcon className='h-3 w-3' />
                        ) : (
                            <ArrowDownIcon className='h-3 w-3' />
                        )}
                        <span className='text-xs ml-1'>
                            {Math.abs(change)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
