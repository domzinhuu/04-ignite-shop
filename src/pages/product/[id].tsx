import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails
} from "../../styles/pages/product";
import { stripe } from "../../lib/stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import Image from "next/image";
import axios from "axios";
import { useContext, useState } from "react";
import Head from "next/head";
import { CartContext } from "../../contexts/CartContextProvider";
import { formatCurrency } from "../../utils/functions";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { onAddItem } = useContext(CartContext);

  return (
    <>
      <Head>
        <title>{`ignite Shop - ${product.name}`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatCurrency(product.price)}</span>

          <p>{product.description}</p>

          <button onClick={() => onAddItem(product)}>Adicionar a Sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_OUBPB5tSlz7F1d" }
      },
      {
        params: { id: "prod_OUBNXPx2ASS6qz" }
      }
    ],
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"]
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        price: price.unit_amount / 100,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  };
};
