import React from 'react';

const TimeFilter = () => {
    return (
        <div className='flex space-x-6 border-b border-gray-200'>
            <button className='py-3 px-1 font-medium text-gray-800 border-b-2 border-gray-800'>
                Today
            </button>
            <button className='py-3 px-1 text-gray-500 hover:text-gray-800'>
                Last Week
            </button>
            <button className='py-3 px-1 text-gray-500 hover:text-gray-800'>
                Last Month
            </button>
        </div>
    );
};

export default TimeFilter;
