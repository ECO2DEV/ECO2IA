import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise =  loadStripe('pk_test_51MmF5HEZbX6Zpxv9PbTYYGR1U9d14TmcHEsxCKTPzDVpKXDcaFqz87ElscE2TRYjdV3t1r5gxVo3G8FRAlOivqKG00jMOoioNN');

export default function Checkout({price, customerid}) {
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
          sessionId: checkoutSession.data.sessionId,
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
      <button onClick={handleCheckout}>
    Checkout
</button>
      </div>
    );
  }