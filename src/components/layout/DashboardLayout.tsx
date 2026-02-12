import { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import { Outlet } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Sidebar } from "./Sidebar";

const { Sider, Content, Header } = Layout;

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={320}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="hidden lg:block fixed inset-y-0 left-0 min-h-screen overflow-hidden bg-[#001529]"
      >
        <div className="flex h-16 m-4 items-center text-white text-lg font-semibold">
          Product Admin
        </div>
        <Sidebar />
      </Sider>

      <Header className="lg:hidden flex items-center justify-between bg-white px-4 shadow-sm">
        <Button icon={<MenuOutlined />} onClick={() => setMobileOpen(true)} />
        <div className="font-semibold">Product Admin</div>
        <div style={{ width: 32 }} />
      </Header>

      <Drawer
        title="Menu"
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        bodyStyle={{ padding: 0 }}
      >
        <div className="bg-[#001529]">
          <Sidebar onItemClick={() => setMobileOpen(false)} />
        </div>
      </Drawer>

      <Layout
        style={{
          transition: "margin-left 0.2s",
        }}
      >
        <Content className="m-6 min-h-[280px] rounded-lg bg-white p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
