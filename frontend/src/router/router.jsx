import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import AuthPage from '../components/Auth/AuthPage';
import PageCore from '../components/PageCore/PageCore';
import PageIA from '../components/pageIA/PageIa';
import ListUser from '../components/Dashboard/components/userList/UserList';
import HomeDashboard from '../components/Dashboard';
import Dashboards from '../components/Dashboard/components/dashboard/Dashboard';
import UserProfile from '../components/Dashboard/components/userList/ProfilUser/ProfilUser';
import PlayGame from '../components/PlayGame/PlayGame';
import Game2D from '../components/BridgeGame/BridgeGame';
import MazeGame from '../components/MazeGame/MazeGame';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/createIA' element={<PageIA />} />
                <Route path='/signIn' element={<AuthPage />} />
                <Route path='/create-page' element={<PageCore />} />
                <Route path='/dashboard' element={<HomeDashboard />}>
                    <Route index element={<Dashboards />} />
                    <Route path='list' element={<ListUser />} />
                    <Route
                        path='list/user-profile/:id'
                        element={<UserProfile />}
                    />
                </Route>
                <Route path='/bridge-game' element={<Game2D />} />
                <Route path='/maze-game' element={<MazeGame />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
