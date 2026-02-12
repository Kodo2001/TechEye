import { Card, Row, Col, Statistic } from 'antd';
import { ShoppingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <p className="mb-8 text-gray-600">
        Welcome to the Product Admin Dashboard. Manage your products efficiently.
      </p>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            onClick={() => navigate('/products')}
            className="cursor-pointer"
          >
            <Statistic
              title="Products"
              value="View All"
              prefix={<ShoppingOutlined />}
            />
            <p className="mt-2 text-sm text-gray-600">
              Browse, search, and manage products
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            onClick={() => navigate('/products/create')}
            className="cursor-pointer"
          >
            <Statistic
              title="Add Product"
              value="Create New"
              prefix={<UnorderedListOutlined />}
            />
            <p className="mt-2 text-sm text-gray-600">
              Add a new product to the inventory
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
