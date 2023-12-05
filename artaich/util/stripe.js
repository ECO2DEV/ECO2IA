import { loadStripe } from '@stripe/stripe-js';

const STRIPE_KEY = process.env.STRIPE_KEY;

const stripePromise = loadStripe('pk_live_51MmF5HEZbX6Zpxv9jAViXayufKdtNHbR3B95kUFAFg424uNDazCpZ4SwRxuiv3Er2byJs6M0ATZWHYBBD7NIaOjo00E6LpUFqp');

export { stripePromise };
