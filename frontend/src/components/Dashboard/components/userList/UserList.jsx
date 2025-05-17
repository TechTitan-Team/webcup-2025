import React from 'react';
import Filters from './Filters/Filters';
import SearchInput from '../../common/SearchInput/SearchInput';
import ListTable from '../../common/ListTable/ListTable';
import { Outlet } from 'react-router-dom';

const ListUser = () => {
    return (
        <div className='py-6 px-8 bg-soft-white rounded-[3rem]'>
            <div className='flex justify-between'>
                <Filters />
                <SearchInput />
            </div>
            <div className='pt-5'>
                <ListTable />
            </div>
        </div>
    );
};

export default ListUser;
