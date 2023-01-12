import { ProductStyles } from "../styles/ProductStyle"
import Link from "next/link"

const Product = ({ product }) => {

  const { image, title, price, slug } = product.attributes

  return (
    <ProductStyles>

      <Link href={`product/${slug}`}>
        <img src={image.data.attributes.formats.small.url} alt={title} />
      </Link>

      <h2>{title}</h2>

      <h3>{price}</h3>

    </ProductStyles>
  )
}
export default Product