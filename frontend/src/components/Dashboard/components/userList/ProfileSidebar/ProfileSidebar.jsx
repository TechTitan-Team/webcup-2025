import React from 'react';

const ProfileSidebar = ({ user }) => {
    return (
        <div className='bg-white rounded-3xl shadow-sm overflow-hidden'>
            <div
                className='relative h-48 bg-cover bg-center'
                style={{ backgroundImage: `url(${user.coverImage})` }}
            >
                <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2'>
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className='w-24 h-24 rounded-full border-4 border-white'
                    />
                </div>
            </div>

            <div className='pt-16 px-6 pb-8 text-center'>
                <h2 className='text-xl font-medium text-gray-800'>
                    {user.name}
                </h2>
                <p className='text-gray-600'>{user.jobTitle}</p>

                <div className='mt-8'>
                    <h3 className='font-medium text-gray-700 text-left mb-4'>
                        Informations de base
                    </h3>

                    <div className='space-y-3'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='mr-3'>🎂</span>
                                <span className='text-gray-600'>
                                    Anniversaire
                                </span>
                            </div>
                            <span className='text-gray-800'>
                                {user.birthday}
                            </span>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='mr-3'>📱</span>
                                <span className='text-gray-600'>
                                    Numéro de téléphone
                                </span>
                            </div>
                            <span className='text-gray-800'>{user.phone}</span>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='mr-3'>✉️</span>
                                <span className='text-gray-600'>E-Mail</span>
                            </div>
                            <span className='text-gray-800'>{user.email}</span>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='mr-3'>🏳️</span>
                                <span className='text-gray-600'>
                                    Nationalité
                                </span>
                            </div>
                            <span className='text-gray-800'>
                                {user.citizenship}
                            </span>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='mr-3'>🏙️</span>
                                <span className='text-gray-600'>Ville</span>
                            </div>
                            <span className='text-gray-800'>{user.city}</span>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='mr-3'>🏠</span>
                                <span className='text-gray-600'>Adresse</span>
                            </div>
                            <span className='text-gray-800'>
                                {user.address}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='mt-8'>
                    <h3 className='font-medium text-gray-700 text-left mb-4'>
                        Documents
                    </h3>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-blue-50 p-3 rounded-lg text-center'>
                            <div className='text-blue-500 mb-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 mx-auto'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    />
                                </svg>
                            </div>
                            <div className='text-gray-700 font-medium'>
                                Contrat
                            </div>
                            <div className='text-gray-500 text-sm'>
                                {user.contractSize}
                            </div>
                        </div>

                        <div className='bg-red-50 p-3 rounded-lg text-center'>
                            <div className='text-red-500 mb-1'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 mx-auto'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    />
                                </svg>
                            </div>
                            <div className='text-gray-700 font-medium'>CV</div>
                            <div className='text-gray-500 text-sm'>
                                {user.resumeSize}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-8'>
                    <h3 className='font-medium text-gray-700 text-left mb-4'>
                        Statistiques
                    </h3>

                    <div className='space-y-4'>
                        <div>
                            <div className='flex justify-between mb-1'>
                                <span className='text-gray-600'>
                                    Voyages d'affaires
                                </span>
                                <span className='text-gray-800'>
                                    {user.businessTrips} jours
                                </span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                <div
                                    className='bg-yellow-400 h-2 rounded-full'
                                    style={{
                                        width: `${
                                            (user.businessTrips / 100) * 100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between mb-1'>
                                <span className='text-gray-600'>Maladie</span>
                                <span className='text-gray-800'>
                                    {user.sicknessDays} jours
                                </span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                <div
                                    className='bg-blue-500 h-2 rounded-full'
                                    style={{
                                        width: `${
                                            (user.sicknessDays / 100) * 100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
