import { api } from './api';
import type { Product, ProductCategory, Brand, Store, CreateProductPayload,UpdateProductPayload } from '../types';

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await api.get<ProductCategory[]>('/ProductCategories');
  return response.data;
};

export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get<Brand[]>('/brands');
  return response.data;
};

export const getStores = async (): Promise<Store[]> => {
  const response = await api.get<Store[]>('/stores');
  return response.data;
};

interface ProductQueryParams {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  search?: string;
  searchfield?: string;
  startDate?: string;
  endDate?: string;
}

export const getProducts = async (params?: ProductQueryParams): Promise<Product[]> => {
  // remove undefined so axios doesn't send them
  const cleanParams = params
    ? Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''))
    : undefined;

  const response = await api.get<Product[]>('/products', {
    params: cleanParams,
  });

  return response.data;
};

export const getProduct = async (id: number | string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};


export const createProduct = async (data: CreateProductPayload): Promise<Product> => {
  const response = await api.post<Product>("/products", data);
  return response.data;
};


export const updateProduct = async (
  id: number | string,
  data: UpdateProductPayload
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
};

