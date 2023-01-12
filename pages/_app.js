import '../styles/globals.css'
import { Provider, createClient } from 'urql'
import Nav from '../components/Nav'
import { StateContext } from '../lib/context'

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API }) // provides access to the backend (strapi) using graphql

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  )
}


/*

    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>

    -- By wrapping the '<Component {...pageProps} />' with the '<Provider value={client}> </Provider>' allows all pages to have access to the backend


    <StateContext> .... </StateContext>

      -- Allows any component to have access to globe states that are created in the libs/context.js file.

*/