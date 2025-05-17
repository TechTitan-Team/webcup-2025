import React, { useState } from 'react';
import CustomSelect from '../../../common/CustomSelect/CustomSelect';

const Filters = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const options = [
        { value: 'columns', label: 'Columns' },
        { value: 'columns', label: 'Columns' },
        { value: 'columns', label: 'Columns' },
        { value: 'columns', label: 'Columns' },
    ];

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <div className='flex gap-2'>
            <CustomSelect
                options={options}
                value={selectedValue}
                onChange={handleChange}
            />
            <CustomSelect
                options={options}
                value={selectedValue}
                onChange={handleChange}
            />
            <CustomSelect
                options={options}
                value={selectedValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default Filters;
