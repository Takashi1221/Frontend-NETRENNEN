import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeSessionHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { userEmail } = req.body;

      if (!userEmail) {
        return res.status(400).json({ error: 'User email not found' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          'price': process.env.STRIPE_PRICE,
          'quantity': 1,
        }],
        mode: 'subscription',
        success_url: `${req.headers.origin}/account/signup/success`,
        cancel_url: `${req.headers.origin}/account/signup/payerror`,
        customer_email: userEmail,  // ここでメールアドレスを設定
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating Stripe session:', error); // エラーメッセージを出力
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default stripeSessionHandler;