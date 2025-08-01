import { ProductResponseInterface } from "@/interfaces/product";
import { CardProducts } from "../cards/cardForProducts";

type productGridProps = {
  products: ProductResponseInterface[];
};

export default function ProductGrid({ products }: productGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        return (
          <CardProducts
            key={product.id}
            basePrice={product.basePrice}
            description={product.description}
            id={product.id}
            imageUrl={product.defaultImageUrl}
            name={product.name}
            router=""
          />
        );
      })}
    </div>
  );
}
