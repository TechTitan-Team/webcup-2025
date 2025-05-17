import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Flag = ({ country }) => {
    const flags = {
        Stockholm: '🇸🇪',
        Miami: '🇺🇸',
        Kyiv: '🇺🇦',
        Ottawa: '🇨🇦',
        'Sao Paulo': '🇧🇷',
        London: '🇬🇧',
    };

    return <span className='mr-2 text-lg'>{flags[country]}</span>;
};

const StatusBadge = ({ status }) => {
    const statusStyles = {
        Invited: 'bg-green-100 text-green-800',
        Absent: 'bg-gray-200 text-gray-600',
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusStyles[status] || ''
            }`}
        >
            {status === 'Invited' && (
                <span className='inline-block w-2 h-2 mr-1 bg-green-500 rounded-full'></span>
            )}
            {status === 'Absent' && (
                <span className='inline-block w-2 h-2 mr-1 bg-gray-500 rounded-full'></span>
            )}
            {status}
        </span>
    );
};

const ListTable = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState(initialEmployees);

    const handleUserClick = (userId) => {
        navigate(`/dashboard/list/user-profile/${userId}`);
    };

    return (
        <div className='bg-white rounded-[3rem] shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Name
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                <div className='flex items-center'>
                                    Job title
                                </div>
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                <div className='flex items-center'>
                                    Department
                                </div>
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                <div className='flex items-center'>Site</div>
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                <div className='flex items-center'>Salary</div>
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                <div className='flex items-center'>
                                    Start date
                                </div>
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                <div className='flex items-center'>Status</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {employees.map((employee) => (
                            <tr
                                key={employee.id}
                                className={`hover:bg-yellow-50 cursor-pointer transition duration-150`}
                                onClick={() => handleUserClick(employee.id)}
                            >
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                        <div className='h-10 w-10 flex-shrink-0'>
                                            <img
                                                className='h-10 w-10 rounded-full'
                                                src={employee.avatar}
                                                alt=''
                                            />
                                        </div>
                                        <div className='ml-4'>
                                            <div className='text-sm font-medium text-gray-900'>
                                                {employee.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {employee.jobTitle}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {employee.department}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    <div className='flex items-center'>
                                        <Flag country={employee.site} />
                                        {employee.site}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {employee.salary}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {employee.startDate}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                    <StatusBadge status={employee.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const initialEmployees = [
    {
        id: 1,
        name: 'Anatoly Belik',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        jobTitle: 'Head of Design',
        department: 'Product',
        site: 'Stockholm',
        salary: '$1,350',
        startDate: 'Mar 13, 2023',
        lifecycle: 'Hired',
        status: 'Invited',
        selected: false,
    },
    {
        id: 2,
        name: 'Ksenia Bator',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        jobTitle: 'Fullstack Engineer',
        department: 'Engineering',
        site: 'Miami',
        salary: '$1,500',
        startDate: 'Oct 13, 2023',
        lifecycle: 'Hired',
        status: 'Absent',
        selected: true,
    },
    // ... autres employés
];

export default ListTable;
