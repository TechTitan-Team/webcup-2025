import React from 'react';

const Activities = ({ activities }) => {
    return (
        <div className='bg-white rounded-3xl p-6 shadow-sm mb-6'>
            <h2 className='text-gray-700 font-medium mb-4'>Activities</h2>
            <div className='space-y-4'>
                {activities.map((activity, index) => (
                    <div key={index} className='flex items-center space-x-4'>
                        <img
                            src={activity.avatar}
                            alt={activity.name}
                            className='w-12 h-12 rounded-full'
                        />
                        <div>
                            <h3 className='font-medium text-gray-800'>
                                {activity.name}
                            </h3>
                            <p className='text-gray-600 text-sm'>
                                {activity.role}
                            </p>
                        </div>
                        <div className='flex-grow'>
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                <div
                                    className='bg-yellow-400 h-2 rounded-full'
                                    style={{ width: `${activity.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activities;
