import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51LYUUIHR5sDrkTrNo4OFUMRb0dPb0j6u0fEGTolgyWqHI01GT37HNYnAofimOAMOh8CccNrDltKEKVqqGWSG5m3700U6307bzZ"
);
const stripeRouter = express.Router();

stripeRouter.post("/payment", async (req, res) => {
  const { amount, receipt_email, tokenId } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount, // amount in cents
      currency: "usd",
      source: tokenId,
      receipt_email: receipt_email,
    });

    // If the charge is successful, send back the charge object
    res.status(200).json(charge);
  } catch (error) {
    // If there's an error, send back the error message
    res.status(500).json({ error: error.message });
  }
});

export default stripeRouter;
