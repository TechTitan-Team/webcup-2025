import React from 'react';
import {
    ChartBarIcon,
    ChartPieIcon,
    CubeIcon,
    UserIcon,
    DocumentIcon,
    MapIcon,
    SupportIcon,
    CogIcon,
    LogoutIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: ChartBarIcon, active: true },
        { name: 'Leaderboard', icon: ChartPieIcon },
        { name: 'Shipment', icon: CubeIcon },
        { name: 'Administration', icon: UserIcon },
        { name: 'Library', icon: DocumentIcon },
        { name: 'Maps', icon: MapIcon },
        { name: 'Support', icon: SupportIcon },
    ];

    return (
        <div className='w-60 bg-purple-600 text-white flex flex-col'>
            <div className='p-6'>
                <h2 className='text-xl font-bold'>LOGO</h2>
            </div>

            <nav className='flex-1'>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href='#'
                                className={`flex items-center py-3 px-6 ${
                                    item.active
                                        ? 'bg-purple-700 rounded-lg mx-3'
                                        : 'hover:bg-purple-700 hover:bg-opacity-50'
                                }`}
                            >
                                <item.icon className='h-5 w-5 mr-3' />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className='mt-auto mb-8'>
                <a
                    href='#'
                    className='flex items-center py-3 px-6 hover:bg-purple-700 hover:bg-opacity-50'
                >
                    <CogIcon className='h-5 w-5 mr-3' />
                    <span>Setting</span>
                </a>
                <a
                    href='#'
                    className='flex items-center py-3 px-6 hover:bg-purple-700 hover:bg-opacity-50'
                >
                    <LogoutIcon className='h-5 w-5 mr-3' />
                    <span>Log Out</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
