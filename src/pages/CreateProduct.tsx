import { useNavigate } from "react-router-dom";
import { Button, Space, message } from "antd";
import { ProductForm } from "../components/products/ProductForm";
import { createProduct } from "../services/productService";
import type { ProductFormData } from "../types";

export const CreateProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: ProductFormData) => {
    try {
      const payload: any = {
        name: values.name,
        preferName: values.preferredName ?? "",
        productCategoryId: values.productCategoryId,
        brandId: values.brandId,
        storeId: values.storeId,
        oneMeasure: values.oneMeasure,
        smallMeasure: values.smallMeasure,
        oneContains: values.oneContains,
        mcPurchasePrice: values.mcPurchasePrice,
        mcSellPrice: values.mcSellPrice,
        mcSmallMeasureSellPrice: values.mcSmallMeasureSellPrice,
        initialQte: values.initialQte,
        alertQte: values.alertQte,
        attachment: values.attachment,
        attachmentFileName: values.attachmentFileName,
      };

      const created = await createProduct(payload);
      message.success("Product created successfully");
      navigate(`/products/${created.id}`);
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ?? "Failed to create product",
      );
      throw error;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => navigate("/products")} className="mb-4">
          ← Back to Products
        </Button>
        <h1 className="m-0 text-xl font-semibold">Create Product</h1>
        <p className="mt-2 text-gray-600">
          Add a new product to your inventory
        </p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        submitButton={
          <Space>
            <Button onClick={() => navigate("/products")}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create Product
            </Button>
          </Space>
        }
      />
    </div>
  );
};
