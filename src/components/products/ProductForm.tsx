import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { fileToBase64 } from "../../utils/fileToBase64";
import {
  getProductCategories,
  getBrands,
  getStores,
} from "../../services/productService";
import type {
  ProductCategory,
  Brand,
  Store,
  ProductFormData,
  Product,
} from "../../types";

interface ProductFormProps {
  initialValues?: Partial<Product>;
  isEdit?: boolean;
  onSubmit: (values: ProductFormData) => Promise<void>;
  submitButton: React.ReactNode;
}

export const ProductForm = ({
  initialValues,
  isEdit = false,
  onSubmit,
  submitButton,
}: ProductFormProps) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | undefined>(
    initialValues?.attachmentFileName,
  );

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [cats, brs, sts] = await Promise.all([
          getProductCategories(),
          getBrands(),
          getStores(),
        ]);
        setCategories(cats);
        setBrands(brs);
        setStores(sts);
      } catch (error) {
        message.error("Failed to load form data");
      } finally {
        setLoadingDropdowns(false);
      }
    };
    loadDropdowns();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name ?? "",
        preferredName:
          (initialValues as any).preferredName ??
          (initialValues as any).preferName ??
          "",
        productCategoryId: initialValues.productCategoryId ?? null,
        brandId: initialValues.brandId ?? null,
        storeId: initialValues.storeId ?? null,
        oneMeasure: initialValues.oneMeasure ?? "",
        smallMeasure: initialValues.smallMeasure ?? "",
        oneContains: Number(initialValues.oneContains ?? 1),

        mcPurchasePrice: Number((initialValues as any).mcPurchasePrice ?? 0),
        mcSellPrice: Number((initialValues as any).mcSellPrice ?? 0),
        mcSmallMeasureSellPrice: Number(
          (initialValues as any).mcSmallMeasureSellPrice ?? 0,
        ),
        initialQte: Number((initialValues as any).initialQte ?? 0),

        alertQte: Number(initialValues.alertQte ?? 0),
      });
    }
  }, [initialValues, form]);

  const handleFileChange = async (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList.slice(-1));
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        form.setFieldValue("attachment", base64);
        setUploadedFileName(file.name);
        form.setFieldValue("attachmentFileName", file.name);
      } catch {
        message.error("Failed to read file");
      }
    } else {
      form.setFieldValue("attachment", undefined);
      form.setFieldValue("attachmentFileName", undefined);
      setUploadedFileName(undefined);
    }
  };

  const onFinish = async (values: Record<string, unknown>) => {
    const formData: ProductFormData = {
      name: values.name as string,
      preferredName: (values.preferredName as string) ?? "",
      productCategoryId: values.productCategoryId as number,
      brandId: values.brandId as number,
      storeId: values.storeId as number,
      oneMeasure: (values.oneMeasure as string) ?? "",
      smallMeasure: (values.smallMeasure as string) ?? "",
      oneContains: (values.oneContains as number) ?? 1,
      mcPurchasePrice: (values.mcPurchasePrice as number) ?? 0,
      mcSellPrice: (values.mcSellPrice as number) ?? 0,
      mcSmallMeasureSellPrice: (values.mcSmallMeasureSellPrice as number) ?? 0,
      initialQte: (values.initialQte as number) ?? 0,
      alertQte: (values.alertQte as number) ?? 0,
      attachment: values.attachment as string | undefined,
      attachmentFileName:
        (values.attachmentFileName as string) ?? uploadedFileName,
    };
    await onSubmit(formData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        oneContains: 1,
        initialQte: 0,
        alertQte: 0,
        mcPurchasePrice: 0,
        mcSellPrice: 0,
        mcSmallMeasureSellPrice: 0,
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter product name" }]}
      >
        <Input placeholder="Product name" />
      </Form.Item>
      <Form.Item name="preferredName" label="Preferred Name">
        <Input placeholder="Preferred name" />
      </Form.Item>
      <Form.Item
        name="productCategoryId"
        label="Category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select
          placeholder="Select category"
          loading={loadingDropdowns}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
      <Form.Item
        name="brandId"
        label="Brand"
        rules={[{ required: true, message: "Please select a brand" }]}
      >
        <Select
          placeholder="Select brand"
          loading={loadingDropdowns}
          options={brands.map((b) => ({ value: b.id, label: b.name }))}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
      <Form.Item
        name="storeId"
        label="Store"
        rules={[{ required: true, message: "Please select a store" }]}
      >
        <Select
          placeholder="Select store"
          loading={loadingDropdowns}
          options={stores.map((s) => ({ value: s.id, label: s.name }))}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <h4 className="mt-6 mb-4 text-base font-semibold">Measurements</h4>
      <Form.Item
        name="oneMeasure"
        label="Main Unit (e.g., Box, Carton, Kg)"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="e.g., Box, Carton, Kg" />
      </Form.Item>
      <Form.Item
        name="smallMeasure"
        label="Sub-unit (e.g., Pcs, grams)"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="e.g., Pcs, grams" />
      </Form.Item>
      <Form.Item
        name="oneContains"
        label="How many sub-units in one main unit"
        rules={[{ required: true, message: "Required" }]}
      >
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      <h4 className="mt-6 mb-4 text-base font-semibold">Pricing & Quantity</h4>
      <Form.Item
        name="mcPurchasePrice"
        label="Purchase Price"
        rules={isEdit ? [] : [{ required: true, message: "Required" }]}
      >
        <InputNumber min={0} className="w-full" disabled={isEdit} />
      </Form.Item>

      <Form.Item
        name="mcSellPrice"
        label="Sell Price"
        rules={isEdit ? [] : [{ required: true, message: "Required" }]}
      >
        <InputNumber min={0} className="w-full" disabled={isEdit} />
      </Form.Item>

      <Form.Item
        name="mcSmallMeasureSellPrice"
        label="Small Measure Sell Price"
        rules={isEdit ? [] : [{ required: true, message: "Required" }]}
      >
        <InputNumber min={0} className="w-full" disabled={isEdit} />
      </Form.Item>

      <Form.Item
        name="initialQte"
        label="Initial Quantity"
        rules={isEdit ? [] : [{ required: true, message: "Required" }]}
      >
        <InputNumber min={0} className="w-full" disabled={isEdit} />
      </Form.Item>

      <Form.Item name="alertQte" label="Alert Quantity">
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <h4 className="mt-6 mb-4 text-base font-semibold">Attachment</h4>
      <Form.Item name="attachment" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="attachmentFileName" hidden>
        <Input />
      </Form.Item>
      <Form.Item>
        <Upload.Dragger
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false}
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-4xl text-blue-500" />
          </p>
          <p className="ant-upload-text">Click or drag file to upload</p>
        </Upload.Dragger>
        {uploadedFileName && (
          <p className="mt-2 text-green-500">Uploaded: {uploadedFileName}</p>
        )}
      </Form.Item>

      <Form.Item className="mt-6">{submitButton}</Form.Item>
    </Form>
  );
};
