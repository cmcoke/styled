import { useQuery } from "urql"
import { GET_PRODUCT_QUERY } from "../../lib/query"
import { useRouter } from "next/router"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { useStateContent } from "../../lib/context";




const ProductDetails = () => {


  const { qty, increaseQty, decreaseQty } = useStateContent();


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

        <Buy>Add to Cart</Buy>

      </ProductInfo>


    </DetailsStyle>
  )
}
export default ProductDetails