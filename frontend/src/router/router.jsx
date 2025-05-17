import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import AuthPage from '../components/Auth/AuthPage';
import ListUser from '../components/Dashboard/components/userList/UserList';
import HomeDashboard from '../components/Dashboard';
import Dashboards from '../components/Dashboard/components/dashboard/Dashboard';
import UserProfile from '../components/Dashboard/components/userList/ProfilUser/ProfilUser';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/signIn' element={<AuthPage />} />
                <Route path='/dashboard' element={<HomeDashboard />}>
                    <Route index element={<Dashboards />} />
                    <Route path='list' element={<ListUser />} />
                    <Route
                        path='list/user-profile/:id'
                        element={<UserProfile />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
