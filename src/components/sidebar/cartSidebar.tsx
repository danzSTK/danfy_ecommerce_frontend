"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeCartSidebar } from "@/lib/redux/slices/cartSlice";
import { useGetProductsQuery } from "@/services/routes/products";
import CardProductCart from "../cards/cardProductCart";

export function CartSidebar() {
  const dispatch = useAppDispatch();
  const { data: allProducts } = useGetProductsQuery();
  const { isSidebarOpen, products: cartItems } = useAppSelector(
    (state) => state.cart
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      dispatch(closeCartSidebar());
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = allProducts?.find((p) => p.id === item.productId);

    if (!product) {
      return acc;
    }

    const variant = product.variants.find((v) => v.id === item.variantId);
    const price = variant?.price ?? product.basePrice;
    return acc + price * item.quantity;
  }, 0);

  return (
    <Sheet open={isSidebarOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col max-w-full w-full">
        <SheetHeader>
          <SheetTitle className="text-lg md:text-xl font-bold">
            Carrinho de Compras
          </SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <div className="space-y-6 my-6">
                {cartItems.map((item) => (
                  <CardProductCart key={item.variantId} {...item} />
                ))}
              </div>
            </div>
            <SheetFooter className="mt-auto border-t pt-6">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Taxas e frete serão calculados no checkout.
                </p>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Finalizar Compra</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/cart">Ver Carrinho Detalhado</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Seu carrinho está vazio</h3>
            <p className="text-sm text-muted-foreground">
              Adicione produtos para vê-los aqui.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
