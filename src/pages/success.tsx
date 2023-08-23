import Link from "next/link";
import {
  ImageContainer,
  ImageList,
  SuccessContainer
} from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  quantity: number;
  productList: {
    name: string;
    imageUrl: string;
  }[];
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({
  customerName,
  product,
  quantity,
  productList
}: SuccessProps) {
  console.log(product);
  return (
    <>
      <Head>
        <title>Compra efetuada</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efeturada!</h1>
        {quantity > 1 && (
          <ImageList>
            {productList.map((prod) => (
              <ImageContainer key={prod.name}>
                <Image src={prod.imageUrl} width={120} height={120} alt="" />
              </ImageContainer>
            ))}
          </ImageList>
        )}
        {quantity === 1 && (
          <ImageList>
            <ImageContainer>
              <Image src={product.imageUrl} width={120} height={120} alt="" />
            </ImageContainer>
          </ImageList>
        )}
        {(quantity > 1 && (
          <p>
            Uhuul <strong>{customerName}</strong>, sua compra de
            <strong> {quantity}</strong> camisetas já está a caminho da sua casa
          </p>
        )) || (
          <p>
            Uhuul <strong>{customerName}</strong>, sua{" "}
            <strong>{product.name}</strong> já está a caminho da sua casa
          </p>
        )}

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id || "");

  if (!sessionId) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"]
  });
  const customerName = session.customer_details.name;
  const quantity = session.line_items.data.length;
  const product = session.line_items.data[0].price.product as Stripe.Product;
  const productList = session.line_items.data.map((item: Stripe.LineItem) => {
    const prod = item.price.product as Stripe.Product;

    return {
      name: prod.name,
      imageUrl: prod.images[0]
    };
  });
  return {
    props: {
      customerName,
      quantity,
      productList: productList,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  };
};
