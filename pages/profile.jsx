import { useRouter } from "next/router";
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

// get all the payments that a specific customer made
export const getServerSideProps = withPageAuthRequired({

  async getServerSideProps(ctx) {

    // access the user session
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return {
      props: {
        orders: paymentIntents.data
      }
    };

  },

});


const Profile = ({ user, orders }) => {

  // console.log(orders);

  const route = useRouter();

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map(order => (
            <Order key={order.id}>
              <h1>Order Number: {order.id}</h1>
              <h2>{formatMoney(order.amount)}</h2>
              <h2>Receipt Email: {user.email}</h2>
            </Order>
          ))}
        </div>
        <button onClick={() => route.push("/api/auth/logout")}>Log out</button>
      </div>
    )
  )
}
export default Profile



const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1rem;
    color: var(--secondary);
  }

`;
