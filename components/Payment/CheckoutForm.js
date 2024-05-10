import { loadStripe } from '@stripe/stripe-js';



export const CheckOut = () => {
  async function handleCheckout() {
    const res = await fetch('/api/stripe-session', {
      method: 'POST',
    });
    const { sessionId } = await res.json();
    if (res.ok) {
      // Stripe Checkoutページへリダイレクト
      const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
      stripe.redirectToCheckout({ sessionId });
    } else {
      console.error('Failed to create checkout session.');
    }
  }


  return (
    <div>
      <button onClick={handleCheckout} className="linkButton">
        Jetzt bestellen
      </button>
      <style jsx>{`
        .linkButton {
          display: inline-block;
          padding: 10px 20px;
          color: white;
          background-color: #6528F7;
          border: none;
          border-radius: 5px;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        .linkButton:hover {
          background-color: #4318aa;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
