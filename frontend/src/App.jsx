import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./layout/LandingPage";
import RegisterPage from "./layout/RegisterPage";
import LoginPage from "./layout/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import ProtectPage from "./layout/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import UploadProductPage from "./layout/UploadProductPage";
import DetailProductPage from "./layout/DetailProductPage";
import CartPage from "./layout/CartPage";

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Navbar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const { pathname } = useLocation;
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/product/upload" element={<UploadProductPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
