import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionForm from '../components/payment/SubscriptionForm';
import Checkout from '../components/payment/SubscriptionHandler';

const stripePromise = loadStripe('pk_test_51MmF5HEZbX6Zpxv9PbTYYGR1U9d14TmcHEsxCKTPzDVpKXDcaFqz87ElscE2TRYjdV3t1r5gxVo3G8FRAlOivqKG00jMOoioNN');

const Subscribe = () => {
  return (
    <div>
    <h2>Hola</h2>
    <Checkout price={'plan_NeeieGD7qqOAm9'}/>
    </div>
  );
};


export default Subscribe;