import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingOutlined, LogoutOutlined, AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "../../contexts/AuthContext";

export const Sidebar = ({ onItemClick }: { onItemClick?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/");
        onItemClick?.();
      },
    },
    {
      key: "/products",
      icon: <ShoppingOutlined />,
      label: "Products",
      onClick: () => {
        navigate("/products");
        onItemClick?.();
      },
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: () => {
        logout();
        navigate("/login");
        onItemClick?.();
      },
    },
  ];

  const selectedKey =
    location.pathname === "/products" || location.pathname.startsWith("/products/")
      ? "/products"
      : location.pathname;

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      className="h-full border-r-0"
      theme="dark"
    />
  );
};
