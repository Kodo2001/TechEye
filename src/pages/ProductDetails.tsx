import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Spin, message } from "antd";
import { EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { getProduct } from "../services/productService";
import type { ServerProduct } from "../types";

const formatDateOnly = (iso?: string | null) => (iso ? iso.split("T")[0] : "-");
const n = (v: number | null | undefined) =>
  v === null || v === undefined ? "-" : Number(v).toLocaleString();

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ServerProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const data = (await getProduct(id)) as unknown as ServerProduct;
        setProduct(data);
      } catch (error) {
        message.error("Failed to load product");
        console.error(error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/products")}
        >
          Back to Products
        </Button>

        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/products/${id}/edit`)}
        >
          Edit Product
        </Button>
      </div>

      <Card title={product.name ?? "-"}>
        <Descriptions
          title="Basic Information"
          column={{ xs: 1, sm: 2, lg: 3 }}
          bordered
        >
          <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
          <Descriptions.Item label="Store Product ID">
            {product.storeProductId ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Barcode">
            {product.barcode ?? "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Name">
            {product.name ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Preferred Name">
            {product.preferName ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {product.productCategoryLabel ?? "-"}
          </Descriptions.Item>

          <Descriptions.Item label="Brand">
            {product.brandName ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Store ID">
            {product.storeId ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {product.shortDescription ?? "-"}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Measurements"
          column={{ xs: 1, sm: 2, lg: 3 }}
          bordered
          className="mt-6"
        >
          <Descriptions.Item label="Product Measure">
            {product.productMeasure ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Main Unit">
            {product.oneMeasure ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Sub-unit">
            {product.smallMeasure ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label="One Contains">
            {n(product.oneContains)}
          </Descriptions.Item>
          <Descriptions.Item label="Weight (Kg)">
            {n(product.weightInKg)}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Pricing & Quantity"
          column={{ xs: 1, sm: 2, lg: 3 }}
          bordered
          className="mt-6"
        >
          <Descriptions.Item label="Purchase Price">
            {n(product.mcPurchasePrice)}
          </Descriptions.Item>
          <Descriptions.Item label="Sell Price">
            {n(product.mcSellPrice)}
          </Descriptions.Item>
          <Descriptions.Item label="Small Measure Sell Price">
            {n(product.mcSmallMeasureSellPrice)}
          </Descriptions.Item>

          <Descriptions.Item label="Qty In Stock">
            {n(product.qteInStock)}
          </Descriptions.Item>
          <Descriptions.Item label="Alert Qty">
            {n(product.alertQte)}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Dates"
          column={{ xs: 1, sm: 2, lg: 3 }}
          bordered
          className="mt-6"
        >
          <Descriptions.Item label="Production Date">
            {formatDateOnly(product.productionDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Expire Date">
            {formatDateOnly(product.expireDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {product.createdAt
              ? new Date(product.createdAt).toLocaleString()
              : "-"}
          </Descriptions.Item>
        </Descriptions>

        {product.attachmentFileName && (
          <div className="mt-6">
            <strong>Attachment: </strong>
            {product.attachmentFileName}
          </div>
        )}
      </Card>
    </div>
  );
};
