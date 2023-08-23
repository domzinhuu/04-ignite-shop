import Image from "next/image";
import {
  CartItemAvatar,
  CartItemContainer,
  CartItemDescription
} from "./styles";
import { Product } from "../../models/product";
import { formatCurrency } from "../../utils/functions";

interface CartItemProps {
  product: Product;
}

export function CartItem({ product }: CartItemProps) {
  return (
    <CartItemContainer>
      <CartItemAvatar>
        <Image src={product.imageUrl} alt="" width={92} height={92} />
      </CartItemAvatar>
      <CartItemDescription>
        <div>
          <p>{product.name}</p>
          <strong>{formatCurrency(product.price)}</strong>
        </div>

        <button>Remover</button>
      </CartItemDescription>
    </CartItemContainer>
  );
}
