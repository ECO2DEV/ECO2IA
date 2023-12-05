import { loadStripe } from '@stripe/stripe-js';

const STRIPE_KEY = process.env.STRIPE_KEY;

const stripePromise = loadStripe(`${STRIPE_KEY}`);

export { stripePromise };
