import React from 'react';
import Header from './components/layoutDashboard/HeaderDashboard';
import { Outlet } from 'react-router-dom';

const HomeDashboard = () => {
    return (
        <main className='management bg-white'>
            <Header />
            <Outlet />
        </main>
    );
};

export default HomeDashboard;
