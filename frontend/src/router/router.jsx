import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import AuthPage from "../components/Auth/AuthPage";
import PageCore from "../components/PageCore/PageCore";
import ContentGenerator from "../components/ContentGenerator/ContentGenerator";
import ClashList from "../components/Clash/Clash";
import ListUser from "../components/Dashboard/components/userList/UserList";
import HomeDashboard from "../components/Dashboard";
import Dashboards from "../components/Dashboard/components/dashboard/Dashboard";
import UserProfile from "../components/Dashboard/components/userList/ProfilUser/ProfilUser";
import ListeTemplate from "../components/AppHomePage/AppHomePage";
import EditableLetter from "../components/TemplateContent/EditableLetter";
import BridgeGame from "../components/BridgeGame/BridgeGame";
import MazeGame from "../components/MazeGame/MazeGame";
import HallOfFame from "../components/HallOfFame/HallOfFame";
import FameDetail from "../components/FameDetail/FameDetail";
import EditableClash from "../components/Clash/editedClash";
import DualIframeComponent from "../components/Clash/ViewClash";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/clash"
          element={
            <ProtectedRoute>
              <ClashList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clash/view/:id"
          element={
            <ProtectedRoute>
              <DualIframeComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clash/:templateId"
          element={
            <ProtectedRoute>
              <EditableClash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/create-ai"
          element={
            <ProtectedRoute>
              <ContentGenerator />
            </ProtectedRoute>
          }
        />
        <Route path="/signIn" element={<AuthPage />} />
        <Route
          path="/create-page"
          element={
            <ProtectedRoute>
              <PageCore />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<HomeDashboard />}>
          <Route index element={<Dashboards />} />
          <Route path="list" element={<ListUser />} />
          <Route path="list/user-profile/:id" element={<UserProfile />} />
        </Route>
        <Route
          path="/list-template"
          element={
            <ProtectedRoute>
              <ListeTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/template/:templateId"
          element={
            <ProtectedRoute>
              <EditableLetter />
            </ProtectedRoute>
          }
        />
        <Route path="/bridge-game" element={<BridgeGame />} />
        <Route path="/maze-game" element={<MazeGame />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="/fame-detail/:id" element={<FameDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
