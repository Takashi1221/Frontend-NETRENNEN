import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';


export const CheckOut = () => {
  async function handleCheckout() {

    let userEmail;
    // Emailをチェックする関数
    const checkEmail = async () => {
      try {
        const response = await axios.get('/api/checkemail/');
        if (response.status === 200) {
          userEmail = response.data.email;
        } else {
          console.error('Failed to get user email:', response.status);
        }
      } catch (error) {
        console.error('Failed to get user email:', error);
      }
    };

    await checkEmail();

    // Stripeセッションの作成リクエスト
    const res = await fetch('/api/stripe-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail: userEmail }),
    });

    const { sessionId } = await res.json();
    if (res.ok) {
      // Stripe Checkoutページへリダイレクト
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
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
