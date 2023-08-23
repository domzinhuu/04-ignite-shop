import {
  CartAction,
  CartBackground,
  CartContainer,
  CartContent,
  CartHeader,
  CartItems,
  CartResume,
  CartResumeDetail,
  CartTitle
} from "./styles";
import close from "../../assets/close.svg";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContextProvider";
import { CartItem } from "../CartItem";
import axios from "axios";

export function CartModal() {
  const {
    isOpen,
    onToggle,
    items = [],
    quantity,
    totalValue
  } = useContext(CartContext);
  const [isCreateCheckoutSession, setIsCreateCheckoutSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreateCheckoutSession(true);
      const priceIds = items.map((product) => product.defaultPriceId);

      const response = await axios.post(`/api/checkout`, {
        priceIds
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreateCheckoutSession(false);

      // adicionar a algum ferramenta de observabilidade(datadog sentry)
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <CartBackground className={isOpen ? "show" : "hide"}>
      <CartContainer className={isOpen ? "show" : "hide"}>
        <CartHeader>
          <Image onClick={onToggle} src={close} width={24} height={24} alt="" />
        </CartHeader>

        <CartContent>
          <CartItems>
            <CartTitle>Sacola de compras</CartTitle>
            {items.length &&
              items.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </CartItems>

          <CartResume>
            <CartResumeDetail>
              <p>Quantidade</p>
              <p> {quantity} items</p>
            </CartResumeDetail>

            <CartResumeDetail>
              <strong>Valor total</strong>
              <strong>{totalValue}</strong>
            </CartResumeDetail>
          </CartResume>
        </CartContent>

        <CartAction>
          <button disabled={isCreateCheckoutSession} onClick={handleBuyProduct}>
            FinalizarCompra
          </button>
        </CartAction>
      </CartContainer>
    </CartBackground>
  );
}
