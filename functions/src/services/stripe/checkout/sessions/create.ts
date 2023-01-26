import { stripe } from "../../../../libs/stripe";
import { RequestHandler } from "express";

export const create: RequestHandler = async (req, res) => {
  const { name = "テスト", price = 1000 } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: name,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://www.google.com/`,
      cancel_url: `https://www.google.com/`,
    });
    return res.status(200).json({ session: session });
  } catch (error) {
    return res.status(400).json({ status: req.body });
  }
};
