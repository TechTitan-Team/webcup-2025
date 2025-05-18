import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationIcon from '../../../../assets/icons/NotificationIcon';
import UserIcon from '../../../../assets/icons/UserIcon';
// Import du logo avec le chemin correct
import Logo from '../../../../assets/images/theEndPage.webp';

const Header = () => {
    const location = useLocation();

    const active = (slug) => {
        return location.pathname === slug
            ? 'bg-gray-800 text-white px-4 py-2 rounded-full'
            : '';
    };

    return (
        <div className='sticky top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-gray-100'>
            <div>
                <a
                    href='#'
                    className='text-2xl font-display font-bold tracking-wider'
                >
                    The<span className='text-indigo-500'>End</span>
                    <span className='text-indigo-400'>.page</span>
                </a>
            </div>

            <div className='flex items-center gap-14'>
                <div className='bg-white rounded-full px-6 py-2 shadow-sm'>
                    <ul className='flex items-center gap-8'>
                        <Link
                            to={'/dashboard'}
                            className={`transition-all duration-200 ${
                                active('/dashboard') ||
                                'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            Tableau de bord
                        </Link>
                        <Link
                            to={'/dashboard/list'}
                            className={`transition-all duration-200 ${
                                active('/dashboard/list') ||
                                'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            Utilisateurs
                        </Link>
                        <Link
                            to={'/device'}
                            className={`transition-all duration-200 ${
                                active('/device') ||
                                'text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            Categorie
                        </Link>
                    </ul>
                </div>

                <div className='flex items-center gap-3'>
                    <button className='bg-white p-3 rounded-full shadow-sm'>
                        <NotificationIcon size='20' />
                    </button>
                    <button className='bg-white p-3 rounded-full shadow-sm'>
                        <UserIcon size='20' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
