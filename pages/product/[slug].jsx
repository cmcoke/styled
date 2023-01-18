import { useEffect } from "react";
import { useQuery } from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query"
import { useRouter } from "next/router"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { DetailsStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";
import { useStateContent } from "../../lib/context";
import toast from 'react-hot-toast'


const ProductDetails = () => {

  const { qty, setQty, increaseQty, decreaseQty, onAdd } = useStateContent();

  // reset the value of qty to 1 whenever this page (a specific product page) renders
  useEffect(() => {
    setQty(1)
  }, [])

  // get the current page url slug
  const router = useRouter();
  // console.log(router);

  // fetch graphql data for a specific product
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: router.query.slug }
  })

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message} </p>
  // console.log(data);

  // extract data
  const { title, description, image } = data.products.data[0].attributes;

  // display a pop up message whenever a product has been added to the cart
  const notify = () => {
    toast.success(`${title} added to your cart`, { duration: 1500 });
  }

  return (
    <DetailsStyle>

      <img src={image.data.attributes.formats.medium.url} alt={title} />

      <ProductInfo>

        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}><AiFillMinusCircle /></button>
          <p>{qty}</p>
          <button onClick={increaseQty}><AiFillPlusCircle /></button>
        </Quantity>

        <Buy onClick={() => {
          onAdd(data.products.data[0].attributes, qty)
          notify();
        }}>
          Add to Cart
        </Buy>

      </ProductInfo>

    </DetailsStyle>
  )
}
export default ProductDetails