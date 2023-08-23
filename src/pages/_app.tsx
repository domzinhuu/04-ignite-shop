import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logo from "../assets/logo.svg";
import bag from "../assets/bag.png";

import { Bag, Container, Header } from "../styles/pages/app";
import Image from "next/image";
import {
  CartContext,
  CartContextProvider
} from "../contexts/CartContextProvider";
import { useContext } from "react";
import Link from "next/link";
import { CartModal } from "../components/Cart";

globalStyles();

function App({ Component, pageProps }: AppProps) {
  const { quantity, isOpen, onToggle } = useContext(CartContext);
  return (
    <Container>
      <Header>
        <Link href={"/"}>
          <Image src={logo} alt="app logo" />
        </Link>

        <Bag onClick={onToggle}>
          <Image src={bag} width={48} height={48} alt="" />
          {quantity > 0 && <span>{quantity}</span>}
        </Bag>
      </Header>
      <Component {...pageProps} />
      <CartModal  />
    </Container>
  );
}

export default function AppWrapper(props: AppProps) {
  return (
    <CartContextProvider>
      <App {...props} />
    </CartContextProvider>
  );
}
