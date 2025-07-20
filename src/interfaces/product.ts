export interface ProductResponseInterface {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imagePublicId: string;
  defaultImageUrl: string;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  categories: { id: string; name: string }[];
  variants: ProductVariantReponseInterface[];
}

export interface ProductVariantReponseInterface {
  id: string;
  price: number;
  size: string;
  color: string;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  productId: string;
}
