import { PropsWithChildren, createContext, useState } from "react";
import { Product } from "../models/product";
import { sumBy } from "lodash";

interface CartContextProps {
  items: Product[];
  quantity: number;
  totalValue: string;
  isOpen: boolean;
  onAddItem: (item: any) => void;
  onToggle: () => void;
}
export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddItem = (item: any) => {
    const alreadAdded = items.find((product) => product.id === item.id);

    if (alreadAdded) {
      alert("Este item já foi adicionado ao carrinho!");
      return;
    }
    setItems((prev) => [...prev, item]);
  };

  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const quantity = items.length;
  const total = sumBy(items, "price");
  return (
    <CartContext.Provider
      value={{
        quantity,
        items,
        isOpen,
        totalValue: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(total),
        onAddItem: handleAddItem,
        onToggle: handleToggleModal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
