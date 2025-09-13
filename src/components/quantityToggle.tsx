import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface IQuantityToggleProps {
  quantity: number;
  variantId: string;
}

const QuantityToggle: React.FC<IQuantityToggleProps> = ({
  quantity,
  variantId,
}) => {
  const { updateQuantity } = useCart();

  const handleDecrement = () => {
    updateQuantity(variantId, quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(variantId, quantity + 1);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant={"outline"} size="icon" onClick={handleDecrement}>
        <Minus className="size-4" />
        <span className="sr-only">Diminuir quantidade</span>
      </Button>
      <span
        className="font-semibold text-center w-8"
        aria-live="polite"
        aria-label="Current quantity"
      >
        {quantity}
      </span>

      <Button variant={"outline"} size="icon" onClick={handleIncrement}>
        <Plus className="size-4" />
        <span className="sr-only">Aumentar quantidade</span>
      </Button>
    </div>
  );
};


export default QuantityToggle;