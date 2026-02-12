import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Space, Spin, message } from "antd";
import { ProductForm } from "../components/products/ProductForm";
import { getProduct, updateProduct } from "../services/productService";
import type { Product, ProductFormData } from "../types";

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const data = await getProduct(id);
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

  // ✅ Map backend product -> UI form fields
  const initialValues = useMemo(() => {
    if (!product) return undefined;

    return {
      ...product,
      // backend: preferName
      preferredName: (product as any).preferName ?? "",
      // backend response: qteInStock, but UI field is initialQte (read-only in edit)
      initialQte: Number((product as any).qteInStock ?? 0),
    } as any;
  }, [product]);

  const handleSubmit = async (values: ProductFormData) => {
    if (!id || !product) return;

    try {
      // ✅ build a backend-compatible PUT payload
      // IMPORTANT:
      // - backend request expects: preferName + initialQte (NOT qteInStock)
      // - read-only fields still must be included for PUT (keep their old values)
      const payload = {
        name: values.name,
        preferName: values.preferredName ?? "",

        productCategoryId: values.productCategoryId ?? null,
        brandId: values.brandId ?? null,
        storeId: values.storeId ?? null,

        oneMeasure: values.oneMeasure ?? "",
        smallMeasure: values.smallMeasure ?? "",
        oneContains: values.oneContains ?? 1,

        // read-only in edit (send existing values)
        mcPurchasePrice: Number((product as any).mcPurchasePrice ?? 0),
        mcSellPrice: Number((product as any).mcSellPrice ?? 0),
        mcSmallMeasureSellPrice: Number(
          (product as any).mcSmallMeasureSellPrice ?? 0,
        ),
        initialQte: Number((product as any).qteInStock ?? 0),

        // editable
        alertQte: Number(values.alertQte ?? 0),

        // attachment optional
        attachment: values.attachment ?? null,
        attachmentFileName: values.attachmentFileName ?? null,
      };

      await updateProduct(id, payload);

      message.success("Product updated successfully");
      navigate(`/products/${id}`);
    } catch (error) {
      message.error("Failed to update product");
      console.error(error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!product || !initialValues) return null;

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => navigate(`/products/${id}`)} className="mb-4">
          ← Back to Product
        </Button>
        <h1 className="m-0 text-xl font-semibold">Edit Product</h1>
        <p className="mt-2 text-gray-600">
          Editing: {product.name} (Price & Quantity fields are read-only)
        </p>
      </div>

      <ProductForm
        initialValues={initialValues}
        isEdit
        onSubmit={handleSubmit}
        submitButton={
          <Space>
            <Button onClick={() => navigate(`/products/${id}`)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Space>
        }
      />
    </div>
  );
};
