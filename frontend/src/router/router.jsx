import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import AuthPage from "../components/Auth/AuthPage";
import PageIA from "../components/pageIA/PageIa";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/createIA" element={<PageIA />} />
        <Route path="/signIn" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;