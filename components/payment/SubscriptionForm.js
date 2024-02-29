import { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { DataPayment } from '../../data/payment';

const SubscriptionForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const { error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError.message);
      }

      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      {success ? (
        <p> {DataPayment.SubscriptionCreated} </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" disabled={!stripe || !elements || loading}>
            {loading ? (DataPayment.Processing) : (DataPayment.Suscribe)}
          </button>
        </form>
      )}
    </div>
  );
};

export default SubscriptionForm;
