// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthResponse {
  token: string;
}


// Product Category
export interface ProductCategory {
  id: number;
  name: string;
  [key: string]: unknown;
}

// Brand
export interface Brand {
  id: number;
  name: string;
  [key: string]: unknown;
}

// Store
export interface Store {
  id: number;
  name: string;
  [key: string]: unknown;
}

// Product
export type Product = {
  id: number;
  storeProductId: number;
  barcode: string | null;

  name: string | null;
  preferName: string | null;

  shortDescription: string | null;

  productMeasure: string | null;
  oneContains: number | null;
  weightInKg: number | null;
  oneMeasure: string | null;

  productCategoryId: number | null;
  productCategoryLabel: string | null;

  brandId: number | null;
  brandName: string | null;

  storeId: number | null;

  mcPurchasePrice: number | null;
  mcSellPrice: number | null;
  mcSmallMeasureSellPrice: number | null;

  qteInStock: number | null;
  alertQte: number | null;

  productionDate: string | null;
  expireDate: string | null;
  createdAt: string | null;

    attachmentFileName?: string;
  smallMeasure?: string;
};


export type CreateProductPayload = {
  name: string;
  preferName: string;
  productCategoryId: number;
  brandId: number;
  storeId: number;
  oneMeasure: string;
  smallMeasure: string;
  oneContains: number;
  mcPurchasePrice: number;
  mcSellPrice: number;
  mcSmallMeasureSellPrice: number;
  initialQte: number;
  alertQte: number;
  attachment?: string | null;
  attachmentFileName?: string | null;
};

export type UpdateProductPayload = {
  name: string;
  preferName: string;

  productCategoryId: number | null;
  brandId: number | null;
  storeId: number | null;

  oneMeasure: string;
  smallMeasure: string;
  oneContains: number;

  // read-only but still sent for PUT
  mcPurchasePrice: number;
  mcSellPrice: number;
  mcSmallMeasureSellPrice: number;
  initialQte: number;

  alertQte: number;

  attachment?: string | null;
  attachmentFileName?: string | null;
};

export type ServerProduct = {
  id: number;
  storeProductId: number;
  barcode: string | null;

  name: string | null;
  preferName: string | null;

  productCategoryLabel: string | null;
  brandName: string | null;
  storeId: number | null;

  shortDescription: string | null;

  productMeasure: string | null;
  oneMeasure: string | null;
  smallMeasure: string | null;
  oneContains: number | null;
  weightInKg: number | null;

  mcPurchasePrice: number | null;
  mcSellPrice: number | null;
  mcSmallMeasureSellPrice: number | null;

  qteInStock: number | null;
  alertQte: number | null;

  productionDate: string | null;
  expireDate: string | null;
  createdAt: string | null;

  attachmentFileName?: string | null;
};

export type ProductFormData = {
  name: string;
  preferredName: string;

  productCategoryId: number;
  brandId: number;
  storeId: number;

  oneMeasure: string;
  smallMeasure: string;
  oneContains: number;

  mcPurchasePrice: number;
  mcSellPrice: number;
  mcSmallMeasureSellPrice: number;

  initialQte: number;
  alertQte: number;

  attachment?: string | null;
  attachmentFileName?: string | null;
};
