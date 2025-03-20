import { PriceList, Category } from "@/types/price-list";
import { createSlice } from "@reduxjs/toolkit";

interface PriceListState {
  active: string | null;
  priceList: PriceList[] | null;
  activeCategory: string | null;
  categories: Category[] | null;
  filterKey?:
    | "bestSeller"
    | "newArrival"
    | "priceAsc"
    | "priceDesc"
    | "percentDiscount";
}

const initialState: PriceListState = {
  priceList: [],
  active: null,
  activeCategory: "all",
  categories: [],
  filterKey: "bestSeller",
};

export const priceListSlice = createSlice({
  name: "price-list",
  initialState: initialState,
  reducers: {
    setPriceList: (state, action) => {
      state.priceList = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setFilterKey: (state, action) => {
      state.filterKey = action.payload;
    },
    setProductAvailability: (state, action) => {
      const { variantId, quantity } = action.payload;
      const priceList = state.priceList?.find(
        (price) => price.id === state.active
      );
      if (priceList) {
        priceList.prices.forEach((price) => {
          if (price.id === variantId) {
            price.availability = quantity;
          }
        });
      }
    },
    setProductOutofStock: (state, action) => {
      const { variantId } = action.payload;
      const priceList = state.priceList?.find(
        (price) => price.id === state.active
      );
      if (priceList) {
        priceList.prices.forEach((price) => {
          if (price.id === variantId) {
            price.is_out_of_stock = true;
          }
        });
      }
    },
  },
});

export const {
  setCategories,
  setPriceList,
  setActive,
  setActiveCategory,
  setFilterKey,
  setProductAvailability,
  setProductOutofStock,
} = priceListSlice.actions;
export default priceListSlice.reducer;
