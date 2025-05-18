import React from 'react';
import { useParams } from 'react-router-dom';
import Activities from '../Activities/Activities';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import Templates from '../Template/Template';

const UserProfile = () => {
    const { id } = useParams();

    const userData = {
        id: id || '1',
        name: 'Amélie Laurent',
        jobTitle: 'UX Designer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        coverImage:
            'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        firstName: 'Amélie',
        lastName: 'Laurent',
        email: 'amelielaurent88@gmail.com',
        phone: '+33 1 70 36 39 50',
        dob: '26 September 1988',
        country: 'France',
        bio: "Passionate about connecting businesses with the goodness of nature! 🌱 I'm on a mission to make organic food, medicine, fruits, and FMCG products easily accessible to B2B partners. 👍 Health and sustainability drive my business ethos. ✨ I love working closely with businesses that share our values. Let's grow together! 🌱",
        birthday: '26 September 1998',
        citizenship: 'France',
        city: 'Paris',
        address: '95700 Roissy-en-France',
        contractSize: '2.3 MB',
        resumeSize: '7.5 MB',
        businessTrips: 58,
        sicknessDays: 24,
    };

    const activities = [
        {
            name: 'Katy Fuller',
            role: 'Fullstack Engineer',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            progress: 60,
        },
        {
            name: 'Katy Fuller',
            role: 'Fullstack Engineer',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            progress: 75,
        },
        {
            name: 'Katy Fuller',
            role: 'Fullstack Engineer',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            progress: 45,
        },
        {
            name: 'Katy Fuller',
            role: 'Fullstack Engineer',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            progress: 90,
        },
    ];

    const handleSaveProfile = (data) => {
        console.log('Saving profile data:', data);
    };

    return (
        <div className='bg-gray-100 min-h-screen p-8'>
            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-12 md:col-span-3'>
                    <Activities activities={activities} />
                </div>
                <div className='col-span-12 md:col-span-5'>
                    <Templates user={userData} onSave={handleSaveProfile} />
                </div>
                <div className='col-span-12 md:col-span-4'>
                    <ProfileSidebar user={userData} />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
