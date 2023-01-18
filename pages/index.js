import Head from 'next/head'
import { useQuery } from 'urql'
import Product from '../components/Product'
import { PRODUCT_QUERY } from '../lib/query'
import { Gallery } from '../styles/Gallery'


const Home = () => {

  // fetch the data from the collection type called 'Product' that was created in strapi
  const [results] = useQuery({ query: PRODUCT_QUERY })
  // console.log(results);
  const { data, fetching, error } = results;

  // check for the data coming in
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message} </p>
  // console.log(data);

  const products = data.products.data
  // console.log(products);

  return (
    <>
      <Head>
        <title>Styled</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Gallery>
          {products.map(product => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </Gallery>

      </main>
    </>
  )
}
export default Home