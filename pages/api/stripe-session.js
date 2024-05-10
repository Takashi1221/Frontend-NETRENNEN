import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeSessionHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          'price': 'price_1P4ZLRP7YkWaTMxs0OxGjhJc',
          'quantity': 1,
        }],
        mode: 'subscription',
        success_url: `${req.headers.origin}/account/signup/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/account/signup/payerror`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default stripeSessionHandler;