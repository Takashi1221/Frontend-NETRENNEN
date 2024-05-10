import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webHookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // WebHookから必要な情報を取得
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userEmail = session.customer_email;

    // Django APIを呼び出してユーザーのサブスクリプションを更新
    const djangoResponse = await fetch('/api/update_subscription/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
    });

    if (!djangoResponse.ok) {
      return res.status(500).json({ error: 'Failed to update subscription in Django' });
    }

    return res.json({ success: true });
  }

  return res.json({ received: true });
};

export default webHookHandler;