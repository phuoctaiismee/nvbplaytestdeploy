export interface PriceListData {
  price_lists: PriceList[];
}

export interface Category {
  id: string;
  name: string;
  handle: string;
}

export interface PriceList {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  starts_at: string;
  ends_at: string;
  rules_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  prices: Price[];
  categories: Category[];
}

export interface Price {
  id: string;
  title: null;
  price_list_id: string;
  created_at: string;
  amount: number;
  price_set_id: string;
  price_set: PriceSet;
  discount_percentage: number;
  availability: number;
  is_out_of_stock?: boolean;
}

export interface PriceSet {
  id: string;
  variant: Variant;
}

export interface Variant {
  product_id: string;
  id: string;
  title: string;
  sku: string;
  metadata: Metadata | null;
  product: Product;
  inventory_items: InventoryItem[];
  calculated_price: CalculatedPrice;
}

export interface CalculatedPrice {
  id: string;
  is_calculated_price_price_list: boolean;
  is_calculated_price_tax_inclusive: boolean;
  calculated_amount: number;
  raw_calculated_amount: Raw;
  is_original_price_price_list: boolean;
  is_original_price_tax_inclusive: boolean;
  original_amount: number;
  raw_original_amount: Raw;
  currency_code: string;
  calculated_price: CalculatedPriceClass;
  original_price: CalculatedPriceClass;
}

export interface CalculatedPriceClass {
  id: string;
  price_list_id: null | string;
  price_list_type: null | string;
  min_quantity: null;
  max_quantity: null;
}

export interface Raw {
  value: string;
  precision: number;
}

export interface InventoryItem {
  variant_id: string;
  inventory_item_id: string;
  inventory: Inventory;
}

export interface Inventory {
  id: string;
  location_levels: LocationLevel[];
}

export interface LocationLevel {
  id: string;
  location_id: string;
  metadata: null;
  inventory_item_id: string;
  raw_stocked_quantity: Raw;
  raw_reserved_quantity: Raw;
  raw_incoming_quantity: Raw;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  available_quantity: number;
  stocked_quantity: number;
  reserved_quantity: number;
  incoming_quantity: number;
}

export interface Metadata {
  thumbnail: string;
}

export interface Product {
  thumbnail: string;
  id: string;
  handle: string;
  categories: Category[];
}
