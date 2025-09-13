import { LOCAL_STORAGE_KEYS } from "@/interfaces/Constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isClient = typeof window !== "undefined";

export interface ICartItem {
  variantId: string;
  productId: string;
  quantity: number;
}

export interface ICartState {
  products: ICartItem[];
  isSidebarOpen: boolean;
}

const loadInitialState = (): ICartState => {
  if (!isClient) return { products: [], isSidebarOpen: false };

  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    if (serializedState === null) {
      return { products: [], isSidebarOpen: false };
    }
    const parsedProducts: ICartItem[] = JSON.parse(serializedState);

    return { products: parsedProducts, isSidebarOpen: false };
  } catch (error) {
    console.error("Erro ao carregar o carrinho do localStorage: ", error);
    return { products: [], isSidebarOpen: false };
  }
};

const initialState: ICartState = loadInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.variantId === newItem.variantId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.products.push(newItem);
      }

      if (isClient) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.CART,
          JSON.stringify(state.products)
        );
      }
    },

    removeProductFromCart: (
      state,
      action: PayloadAction<{ variantId: string }>
    ) => {
      state.products = state.products.filter(
        (item) => item.variantId !== action.payload.variantId
      );

      if (isClient) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.CART,
          JSON.stringify(state.products)
        );
      }
    },

    updateQuantityProductFromCart: (
      state,
      action: PayloadAction<{ variantId: string; quantity: number }>
    ) => {
      const { variantId, quantity } = action.payload;
      const itemToupdate = state.products.find(
        (item) => item.variantId === variantId
      );

      if (itemToupdate) {
        if (quantity > 0) {
          itemToupdate.quantity = quantity;
        } else {
          state.products = state.products.filter(
            (item) => item.variantId !== variantId
          );
        }
      }

      if (isClient) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.CART,
          JSON.stringify(state.products)
        );
      }
    },

    clearCart: (state) => {
      state.products = [];

      if (isClient) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
      }
    },

    openCartSidebar: (state) => {
      state.isSidebarOpen = true;
    },

    closeCartSidebar: (state) => {
      state.isSidebarOpen = false;
    },

    toggleCartSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const {
  openCartSidebar,
  closeCartSidebar,
  toggleCartSidebar,
  addProductToCart,
  removeProductFromCart,
  updateQuantityProductFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
