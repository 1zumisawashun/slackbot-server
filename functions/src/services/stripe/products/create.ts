import { stripe } from "../../../libs/stripe";
import { RequestHandler } from "express";

export const create: RequestHandler = async (req, res) => {
  const { name = "テスト", price = 1000 } = req.body;
  console.log(req.body, "req.body");
  try {
    const product = await stripe.products.create({
      name: name,
    });
    await stripe.prices.create({
      unit_amount: price,
      currency: "jpy",
      product: product.id,
    });
    return res.status(200).json({ status: req.body });
  } catch (error) {
    return res.status(400).json({ status: req.body });
  }
};
