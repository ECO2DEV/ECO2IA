import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.STRIPE_KEY);
import { DataPayment } from '../../data/payment';
export default function Checkout({ price }) {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const checkoutSession = await axios.post('/api/create-subscription', {
        price,
        customerid
      });
      //console.log(checkoutSession);

      //  window.location.href =

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.sessionId
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleCheckout}>{DataPayment.Checkout}</button>
    </div>
  );
}
