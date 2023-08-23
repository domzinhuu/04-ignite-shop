import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const priceIds: string[] = req.body.priceIds;

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  if (!req.body.priceIds) {
    return res.status(400).json({ error: "products not found" });
  }

  const lineItems = priceIds.map((id) => ({ price: id, quantity: 1 }));

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: lineItems
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  });
}
