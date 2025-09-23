// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import LayoutWithNavbar from "../layout/LayoutWithNavbar";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import HomePage from "../pages/Home";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminPage from "../pages/admin/AdminPage";
import ProductListAdmin from "../pages/admin/ProductListAdmin";
import ProductDetail from "../pages/admin/ProductDetail";
import UserListAdmin from "../pages/admin/UserListAdmin";
import UserDetail from "../pages/admin/UserDetail";

function AppRouter() {
  return (
    <Routes>
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin rotaları: guard içeride yapacak */}
        <Route
          path="/admin"
          element={<PrivateRoute roles={["ROLE_ADMIN", "ADMIN"]}><AdminPage /></PrivateRoute>}
        >
          <Route index element={<ProductListAdmin />} />
          <Route path="products" element={<ProductListAdmin />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="users" element={<UserListAdmin />} />
          <Route path="users/:id" element={<UserDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
