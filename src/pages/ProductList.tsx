import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProductTable } from "../components/products/ProductTable";
import { getProducts } from "../services/productService";
import type { Product } from "../types";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined,
  );

  const navigate = useNavigate();

  const fetchProducts = async (
    opts?: Partial<{
      search: string;
      page: number;
      pageSize: number;
      sortField?: string;
      sortOrder?: "asc" | "desc";
    }>,
  ) => {
    // ✅ important: allow undefined to clear sorting
    const nextSearch = opts && "search" in opts ? (opts.search ?? "") : search;
    const nextPage = opts && "page" in opts ? (opts.page ?? 1) : page;
    const nextPageSize =
      opts && "pageSize" in opts ? (opts.pageSize ?? 10) : pageSize;

    const nextSortField =
      opts && "sortField" in opts ? opts.sortField : sortField;

    const nextSortOrder =
      opts && "sortOrder" in opts ? opts.sortOrder : sortOrder;

    setLoading(true);
    try {
      const start = (nextPage - 1) * nextPageSize;
      const end = start + nextPageSize;

      const data = await getProducts({
        search: nextSearch || undefined,
        _start: start,
        _end: end,
        _sort: nextSortField,
        _order: nextSortOrder,
      });

      setProducts(data);

      setSearch(nextSearch);
      setPage(nextPage);
      setPageSize(nextPageSize);
      setSortField(nextSortField);
      setSortOrder(nextSortOrder);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-2xl font-semibold">Products</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/products/create")}
          size="large"
        >
          Create Product
        </Button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onView={(id) => navigate(`/products/${id}`)}
        onEdit={(id) => navigate(`/products/${id}/edit`)}
        page={page}
        pageSize={pageSize}
        sortField={sortField}
        sortOrder={sortOrder}
        onSearch={(value) => {
          // reset to first page when searching
          fetchProducts({ search: value, page: 1 });
        }}
        onQueryChange={({ page, pageSize, sortField, sortOrder }) => {
          fetchProducts({ page, pageSize, sortField, sortOrder });
        }}
      />
    </div>
  );
};
