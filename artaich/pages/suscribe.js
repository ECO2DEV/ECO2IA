import { PaymentElement, useStripe } from '@stripe/react-stripe-js';

function Subscribe() {
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Confirm payment with PaymentElement
    const { error, paymentMethod } = await stripe.confirmPayment({
      type: 'PaymentElement',
      paymentElement: {
        // Pass PaymentElement options and values
        card: elements.getElement(PaymentElement),
        billingDetails: {
          name: 'Manuel Felipe Test',
          email: 'manuelfelipe@eco2.com.co'
          // ...other billing details
        },
      },
    });

    if (error) {
      console.error('Failed to confirm payment:', error);
    } else {
      // Send payment details to your backend for subscription creation
      const response = await fetch('/api/stripe/createSubscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 85,
          paymentMethodId: paymentMethod.id,
          priceId: 1
        }),
      });

      if (response.ok) {
        // Subscription created successfully
        console.log('Subscription created successfully');
      } else {
        console.error('Failed to create subscription:', response);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render your subscription form UI */}
      <PaymentElement />
      <button type="submit">Subscribe</button>
    </form>
  );
}

export default Subscribe;
