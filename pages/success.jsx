import styled from "styled-components";
import tumbsUp from "../public/tumbs-up.png";
import Image from "next/image";
import { useRouter } from "next/router";
const { motion } = require("framer-motion");


// get the user's order information and pass it to the 'Success' component as a prop called 'order'
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {

  // console.log(params.query);

  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );

  return {
    props: { order }
  };

}


// render's the success page when an order completes
const Success = ({ order }) => {

  // console.log(order);

  const route = useRouter();

  return (
    <Wrapper>
      <Card
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.75 } }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Adress</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key} : {val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push("/")}>Continue Shopping</button>
        <Image src={tumbsUp} alt="success" width={300} heigh={300} />
      </Card>
    </Wrapper>
  )
}
export default Success


// styled components for 'Success' component
const Wrapper = styled.div`
  margin: 5rem 15rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;

  h1 {
    color: var(--primary);
    margin-bottom: 1rem;
  }

  h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;

  }
`;

const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`;

const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;

  div {
    padding-bottom: 1rem;
  }

`;

const InfoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
`;
