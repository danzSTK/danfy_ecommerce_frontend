import { useGetOneProductQuery } from "@/services/routes/products";
import { Skeleton } from "../ui/skeleton";
import { ImageWithFallback } from "../fallbacks/imageWithFallback";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import QuantityToggle from "../quantityToggle";
import Link from "next/link";

interface ICardProductCartProps {
  productId: string;
  variantId: string;
  quantity: number;
}
function CartItemSkeleton() {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="w-20 h-24 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <Skeleton className="h-8 w-8" />
    </div>
  );
}

const CardProductCart: React.FC<ICardProductCartProps> = ({
  productId,
  variantId,
  quantity,
}) => {
  const { data: product, isLoading, error } = useGetOneProductQuery(productId);
  const { removeProduct, closeCart } = useCart();

  if (isLoading) {
    return <CartItemSkeleton />;
  }

  if (error || !product) {
    return <div>Erro ao carregar o produto.</div>;
  }

  const variant = product.variants.find((v) => v.id === variantId);
  const displayPrice = variant?.price ?? product.basePrice ?? 0;
  const imageUrl = variant?.imageUrl ?? product.defaultImageUrl;

  if (!variant) {
    return <div>Variante não encontrada.</div>;
  }
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 my-6 px-4">
        <div key={product.id} className="flex items-start gap-4">
          <Link href={`/products/${product.id}`} onClick={closeCart}>
            <div className="relative w-20 h-24 rounded-md overflow-hidden">
              <ImageWithFallback
                src={imageUrl}
                alt={product.name}
                className="object-cover"
                width={80}
                height={96}
              />
            </div>
          </Link>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{product.name}</p>
            <p className="text-sm text-muted-foreground">{variant.color}</p>
            <p className="text-sm font-medium">
              R$ {Number(displayPrice).toFixed(2)}
            </p>
            <div className="mt-2">
              <QuantityToggle quantity={quantity} variantId={variantId} />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeProduct(variantId)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProductCart;
