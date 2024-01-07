import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./layout/LandingPage";
import RegisterPage from "./layout/RegisterPage";
import LoginPage from "./layout/Login";

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
