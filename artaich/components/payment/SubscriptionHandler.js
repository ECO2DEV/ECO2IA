import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise =  loadStripe('pk_live_51MmF5HEZbX6Zpxv9jAViXayufKdtNHbR3B95kUFAFg424uNDazCpZ4SwRxuiv3Er2byJs6M0ATZWHYBBD7NIaOjo00E6LpUFqp');
import { DataPayment } from "../../data/payment";
export default function Checkout({price}) {
    const handleCheckout = async () => {
      try {
        const stripe = await stripePromise;
       
        const checkoutSession = await axios.post("/api/create-subscription", {
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
