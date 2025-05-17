import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import AuthPage from "../components/Auth/AuthPage";
import PageCore from "../components/PageCore/PageCore";
import PageIA from "../components/pageIA/PageIa";
import ClashList from "../components/Clash/Clash";
import ListUser from "../components/Dashboard/components/userList/UserList";
import HomeDashboard from "../components/Dashboard";
import Dashboards from "../components/Dashboard/components/dashboard/Dashboard";
import UserProfile from "../components/Dashboard/components/userList/ProfilUser/ProfilUser";
import AppHomePage from "../components/AppHomePage/AppHomePage";
import EditableLetter from "../components/TemplateContent/EditableLetter";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clash" element={<ClashList />} />
        <Route path="/about" element={<About />} />
        <Route path="/createIA" element={<PageIA />} />
        <Route path="/signIn" element={<AuthPage />} />
        <Route path="/create-page" element={<PageCore />} />
        <Route path="/dashboard" element={<HomeDashboard />}>
          <Route index element={<Dashboards />} />
          <Route path="list" element={<ListUser />} />
          <Route path="list/user-profile/:id" element={<UserProfile />} />
        </Route>
        <Route
          path="/app"
          element={
              <AppHomePage />
          }
        />
        <Route
          path="/app/template/:templateId"
          element={
              <EditableLetter />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
