import React from 'react';
import Filters from './Filters/Filters';
import SearchInput from '../../common/SearchInput/SearchInput';
import ListTable from '../../common/ListTable/ListTable';

const ListUser = () => {
    return (
        <div className='h-screen py-6 px-8 bg-soft-white rounded-[3rem] flex flex-col'>
            <div className='flex justify-between'>
                <Filters />
                <SearchInput />
            </div>
            <div className='pt-5 flex-grow'>
                <ListTable />
            </div>
        </div>
    );
};

export default ListUser;
