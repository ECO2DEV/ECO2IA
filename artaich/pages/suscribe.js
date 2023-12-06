import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionForm from '../components/payment/SubscriptionForm';
import Checkout from '../components/payment/SubscriptionHandler';
import { getUser } from '../util/api/user';

//const stripePromise = loadStripe();

const Subscribe = (props) => {
  return (
    <div>
      <h2>Hola</h2>
      {/* <Checkout price={'plan_NeeieGD7qqOAm9'} customerid={props.user} /> */}
    </div>
  );
};

export default Subscribe;

export async function getServerSideProps(context) {
  const result = await getUser(context);

  if (!result) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin'
      }
    };
  }
  // console.log(result.data.customer_id);
  return {
    props: {
      user: result?.data.customer_id,
      session: result?.session
    }
  };
}
