import Image from "next/image";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import greenBag from "../assets/green-bag.png";
import { useKeenSlider } from "keen-slider/react";
import {
  HomeContainer,
  Product,
  ProductDescription
} from "../styles/pages/home";
import "keen-slider/keen-slider.min.css";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContextProvider";
import { formatCurrency } from "../utils/functions";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    defaultPriceId: string;
  }[];
}

export default function Home({ products = [] }: HomeProps) {
  const { onAddItem } = useContext(CartContext);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
      origin: "auto"
    }
  });

  const handleAddItemToCart = (product: any) => {
    onAddItem(product);
  };

  return (
    <>
      <Head>
        <title>ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt="Camiseta 4"
              />
            </Link>
            <footer>
              <ProductDescription>
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </ProductDescription>

              <Image
                onClick={() => handleAddItemToCart(product)}
                src={greenBag}
                width={56}
                height={56}
                alt=""
              />
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export async function getStaticProps() {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount / 100,
      imageUrl: product.images[0],
      defaultPriceId: price.id
    };
  });

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  };
}
