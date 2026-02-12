import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <AppstoreOutlined style={{ color: 'white' }} />,
      label: 'Dashboard',
      onClick: () => navigate('/'),

    },
    {
      key: '/products',
      icon: <ShoppingOutlined style={{ color: 'white' }} />,
      label: 'Products',
      onClick: () => navigate('/products'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ color: 'white' }} />,
      label: 'Logout',
      danger: true,
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  const selectedKey = location.pathname === '/products' || location.pathname.startsWith('/products/')
    ? '/products'
    : location.pathname;

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      className="h-full border-r-0"
      theme='dark'
      defaultOpenKeys={['/products']}
    />
  );
};
