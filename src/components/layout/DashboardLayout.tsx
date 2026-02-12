import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
const { Sider, Content } = Layout;

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={320}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="fixed inset-y-0 left-0 min-h-screen overflow-hidden bg-[#001529]"
      >
        <div className="flex h-16 m-4 items-center text-white text-lg font-semibold">
          Product Admin
        </div>
        <Sidebar />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 0 : 220,
          transition: 'margin-left 0.2s',
        }}
      >
        <Content
          className="m-6 min-h-[280px] rounded-lg bg-white p-6"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
