import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import AuthPage from "../components/Auth/AuthPage";
import AppHomePage from "../components/AppHomePage/AppHomePage";
import EditableLetter from "../components/TemplateContent/EditableLetter";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/app" element={<Layout />}>
          <Route index element={<AppHomePage />} />
        </Route> */}
        <Route path="/app" element={<AppHomePage />} />
        <Route path="/app/template/:templateId" element={<EditableLetter />} />
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
