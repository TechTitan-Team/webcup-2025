import React from 'react';
import CustomSelect from '../../../common/CustomSelect/CustomSelect';

const Filters = ({ 
    selectedSort, 
    selectedStatus, 
    selectedDepartment, 
    onFilterChange, 
    onFilterReset 
}) => {
    const sortOptions = [
        { value: '', label: 'Trier par' },
        { value: 'Ancien', label: 'Ancien' },
        { value: 'Recent', label: 'Récent' },
        { value: 'AZ', label: 'A-Z' },
        { value: 'ZA', label: 'Z-A' },
    ];

    const statusOptions = [
        { value: '', label: 'Statut' },
        { value: 'Actif', label: 'Actif' },
        { value: 'Absent', label: 'Absent' },
        { value: 'Congé', label: 'En congé' },
    ];

    const departmentOptions = [
        { value: '', label: 'Département' },
        { value: 'IT', label: 'Informatique' },
        { value: 'RH', label: 'Ressources Humaines' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Finance', label: 'Finance' },
    ];

    const handleSortChange = (e) => {
        onFilterChange(e.target.value, selectedStatus, selectedDepartment);
    };

    const handleStatusChange = (e) => {
        onFilterChange(selectedSort, e.target.value, selectedDepartment);
    };

    const handleDepartmentChange = (e) => {
        onFilterChange(selectedSort, selectedStatus, e.target.value);
    };

    const handleApplyFilters = () => {
        // Cet appel est optionnel puisque les filtres sont déjà appliqués à chaque changement
        // Mais on pourrait ajouter une logique supplémentaire ici si nécessaire
        console.log('Filtres appliqués:', { selectedSort, selectedStatus, selectedDepartment });
    };

    return (
        <div className='flex flex-wrap items-center gap-3'>
            <div className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                <CustomSelect
                    options={sortOptions}
                    value={selectedSort}
                    onChange={handleSortChange}
                    className="min-w-[120px]"
                />
            </div>

            <div className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <CustomSelect
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="min-w-[120px]"
                />
            </div>

            <div className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <CustomSelect
                    options={departmentOptions}
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="min-w-[150px]"
                />
            </div>

            <button 
                className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-full flex items-center gap-2 hover:bg-yellow-600 transition-all"
                onClick={handleApplyFilters}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Appliquer
            </button>
            
            <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all"
                onClick={onFilterReset}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Réinitialiser
            </button>
        </div>
    );
};

export default Filters;
