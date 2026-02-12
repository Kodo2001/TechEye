import { Table, Input, Button, Space } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import type { Product } from "../../types";

type SortOrder = "asc" | "desc" | undefined;

interface ProductTableProps {
  products: Product[];
  loading: boolean;

  onView: (id: number) => void;
  onEdit: (id: number) => void;

  // backend search
  onSearch: (value: string) => void;

  // backend sort + pagination
  onQueryChange: (q: {
    page: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: SortOrder;
  }) => void;

  // controlled UI state
  page: number;
  pageSize: number;
  total?: number; // if backend returns it later, else can be omitted
  sortField?: string;
  sortOrder?: SortOrder;
}

export const ProductTable = ({
  products,
  loading,
  onView,
  onEdit,
  onSearch,
  onQueryChange,
  page,
  pageSize,
  total,
  sortField,
  sortOrder,
}: ProductTableProps) => {
  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder:
        sortField === "id"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder:
        sortField === "name"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },
    {
      title: "Preferred Name",
      dataIndex: "preferName",
      key: "preferName",
      sorter: true,
      sortOrder:
        sortField === "preferName"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      sorter: true,
      sortOrder:
        sortField === "barcode"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },
    {
      title: "Category",
      dataIndex: "productCategoryLabel",
      key: "productCategoryLabel",
      sorter: true,
      sortOrder:
        sortField === "productCategoryLabel"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },
    {
      title: "Brand",
      dataIndex: "brandName",
      key: "brandName",
      sorter: true,
      sortOrder:
        sortField === "brandName"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (v: string | null) => (v ? v.split("T")[0] : "-"),
      sortOrder:
        sortField === "createdAt"
          ? sortOrder === "asc"
            ? "ascend"
            : sortOrder === "desc"
              ? "descend"
              : undefined
          : undefined,
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onView(record.id)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record.id)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, any>,
    sorter: SorterResult<Product> | SorterResult<Product>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    const nextPage = pagination.current ?? 1;
    const nextPageSize = pagination.pageSize ?? pageSize;

    let nextSortField: string | undefined = undefined;
    let nextSortOrder: SortOrder = undefined;

    if (s?.order) {
      nextSortField = (s.field as string) || (s.columnKey as string);
      nextSortOrder = s.order === "ascend" ? "asc" : "desc";
    }

    onQueryChange({
      page: nextPage,
      pageSize: nextPageSize,
      sortField: nextSortField,
      sortOrder: nextSortOrder,
    });
  };

  return (
    <div>
      <Space className="mb-4" wrap>
        <Input.Search
          placeholder="Search..."
          allowClear
          onChange={(e) => onSearch(e.target.value)}
          className="w-72"
        />
      </Space>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          current: page,
          pageSize,
          total, // if backend provides total count later
          showSizeChanger: true,
        }}
      />
    </div>
  );
};
