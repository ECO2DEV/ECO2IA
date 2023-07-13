import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MmF5HEZbX6Zpxv9PbTYYGR1U9d14TmcHEsxCKTPzDVpKXDcaFqz87ElscE2TRYjdV3t1r5gxVo3G8FRAlOivqKG00jMOoioNN');

export { stripePromise };