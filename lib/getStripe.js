import { loadStripe } from "@stripe/stripe-js";

let stripe;

const getStripe = async () => {

  if (!stripe) { // if stripe is not connected use the 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY' to connect to it
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripe; // once connected return it

}

export default getStripe;