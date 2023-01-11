import { ProductStyles } from "../styles/ProductStyle"

const Product = ({ product }) => {

  const { image, title, price } = product.attributes

  return (
    <ProductStyles>

      <div>
        <img src={image.data.attributes.formats.small.url} alt={title} />
      </div>

      <h2>{title}</h2>

      <h3>{price}</h3>

    </ProductStyles>
  )
}
export default Product