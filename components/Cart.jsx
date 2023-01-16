import { useStateContent } from '../lib/context'
import { CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, Checkout, Cards } from '../styles/CartStyles'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { Quantity } from '../styles/ProductDetails'


// allows for the staggering animation effect of items in the cart

// animation variants assigned to the 'Cards' component
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1
    }
  }
}

// animation variants assigned to the 'Card' component
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}


const Cart = () => {

  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContent();

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // whenever is the framer motion's 'exit' is used, framer motion's 'AnimatePresence' needs to used when the component unmounts. 'AnimatePresence' is used in the 'Nav.jsx' file in order for this aniamtion to work 
      onClick={() => setShowCart(false)}
    >

      <CartStyle
        initial={{ x: '50%' }}
        animate={{ x: '0%' }}
        exit={{ x: '50%' }} // whenever is the framer motion's 'exit' is used, framer motion's 'AnimatePresence' needs to used when the component unmounts. 'AnimatePresence' is used in the 'Nav.jsx' file in order for this aniamtion to work 
        transition={{ type: 'tween' }}
        onClick={e => e.stopPropagation()}
      >

        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>You have more shopping to do 😉 </h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}

        <Cards layout variants={cards} initial='hidden' animate='show'>
          {cartItems.length >= 1 && (
            cartItems.map(item => {
              return (
                <Card layout variants={card} key={item.slug}>

                  <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />

                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>${item.price}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button onClick={() => onRemove(item)}><AiFillMinusCircle /></button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}><AiFillPlusCircle /></button>
                    </Quantity>
                  </CardInfo>

                </Card>
              )
            })
          )}
        </Cards>

        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: ${totalPrice}</h3>
            <button>Purchase</button>
          </Checkout>
        )}

      </CartStyle>

    </CartWrapper>
  )
}
export default Cart
