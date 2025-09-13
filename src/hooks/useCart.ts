import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addProductToCart,
  ICartItem,
  removeProductFromCart,
  updateQuantityProductFromCart,
  clearCart as clearcartAction,
  openCartSidebar,
  closeCartSidebar,
} from "@/lib/redux/slices/cartSlice";
import { useCallback } from "react";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { products, isSidebarOpen } = useAppSelector((state) => state.cart);

  const addProduct = useCallback(
    (item: ICartItem) => {
      dispatch(addProductToCart(item));
    },
    [dispatch]
  );

  const removeProduct = useCallback(
    (variantId: string) => {
      dispatch(removeProductFromCart({ variantId }));
    },
    [dispatch]
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      dispatch(updateQuantityProductFromCart({ variantId, quantity }));
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch(clearcartAction());
  }, [dispatch]);

  const openCart = useCallback(() => {
    if (!isSidebarOpen) {
      dispatch(openCartSidebar());
    }
  }, [dispatch, isSidebarOpen]);

  const closeCart = useCallback(() => {
    if (isSidebarOpen) {
      dispatch(closeCartSidebar());
    }
  }, [dispatch, isSidebarOpen]);

  return {
    products,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    isSidebarOpen,
    openCart,
    closeCart,
  };
};
