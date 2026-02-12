import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Login } from "../../pages/Login";
import { Dashboard } from "../../pages/Dashboard";
import { ProductList } from "../../pages/ProductList";
import { CreateProduct } from "../../pages/CreateProduct";
import { ProductDetails } from "../../pages/ProductDetails";
import { EditProduct } from "../../pages/EditProduct";

const LoginRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Login />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRedirect />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="*" element={<LoginRedirect />} />
      </Route>

    </Routes>
  );
};
