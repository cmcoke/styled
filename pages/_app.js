import '../styles/globals.css'
import { Inter } from '@next/font/google'
import { Provider, createClient } from 'urql'
import Nav from '../components/Nav'
import { StateContext } from '../lib/context'
import { UserProvider } from '@auth0/nextjs-auth0';
import { Toaster } from 'react-hot-toast'


const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API }) // provides access to the backend (strapi) using graphql

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </Provider>
      </StateContext>
    </UserProvider>
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