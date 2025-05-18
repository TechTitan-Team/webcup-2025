import React from 'react';
import RecentSales from '../tables/RecentSales';
import OrderTable from '../tables/OrderTable';
import ProductSales from '../charts/ProductSales';
import RevenueChart from '../charts/RevenueChart';
import StatCards from './StatCards';
import TimeFilter from './TimeFilter';

const Dashboards = () => {
    return (
        <div className='flex-1 p-14 overflow-auto'>
            <div className='flex justify-between mb-6'>
                <TimeFilter />
                <div className='flex space-x-3'>
                    <button className='px-6 py-2 border border-gray-300 rounded-full flex items-center space-x-2'>
                        <span>Filtrer</span>
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
                    <button className='px-6 py-2 border border-gray-300 rounded-full'>
                        Effacer
                    </button>
                </div>
            </div>

            <StatCards />

            <div className='grid grid-cols-12 gap-6 mt-6'>
                <div className='col-span-8 bg-white rounded-lg p-6 shadow-sm'>
                    <RevenueChart />
                </div>
                <div className='col-span-4 bg-white rounded-lg p-6 shadow-sm'>
                    <ProductSales />
                </div>
            </div>

            <div className='grid grid-cols-12 gap-6 mt-6'>
                <div className='col-span-7 bg-white rounded-lg p-6 shadow-sm'>
                    <OrderTable />
                </div>
                <div className='col-span-5 bg-white rounded-lg p-6 shadow-sm'>
                    <RecentSales />
                </div>
            </div>
        </div>
    );
};

export default Dashboards;
