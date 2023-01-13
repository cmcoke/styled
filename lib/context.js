import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {

  // add data for the state
  const [qty, setQty] = useState(1)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalQuantites, setTotalQuantites] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // increase product quantity
  const increaseQty = () => {
    setQty(prevQty => prevQty + 1)
  }

  // decrease product quanty
  const decreaseQty = () => {

    setQty(prevQty => {

      if (prevQty - 1 < 1) return 1; // if the previous quantity is less than 1 return 1
      return prevQty - 1 // else minus 1 from the previous quantity

    })

  }

  // add product to cart
  const onAdd = (product, quantity) => {

    // total price of all products
    setTotalPrice(prevTotal => prevTotal + product.price * quantity)

    // display the number of quantites that appear on top of the cart icon (for increase quanity)
    setTotalQuantites(prevTotal => prevTotal + quantity)

    // check if product is already in the cart
    const exist = cartItems.find(item => item.slug === product.slug)

    if (exist) { /* If true, call the setCartItems() and use the map() on cartItems array to check to see if the item & product slug are the same (item.slug === product.slug). 
                    If they are the same keep the information about the product (title, description, slug, etc) but update the quantity { ...exist, quantity: exist.quantity + quantity } 
                    else return the item
                  */
      setCartItems(
        cartItems.map(item => item.slug === product.slug ? { ...exist, quantity: exist.quantity + quantity } : item)
      )
    } else { // if false keep the remaining other products by using '...cartItems' if there are any other product in the cart. Also add the new product and it's quantity ( { ...product, quantity: quantity } )
      setCartItems([...cartItems, { ...product, quantity: quantity }])
    }

  }

  // remove a product from the cart or reduce the amount of quantity
  const onRemove = (product) => {

    // total price of all products
    setTotalPrice(prevTotal => prevTotal - product.price)

    // display the number of quantites that appear on top of the cart icon (for decrease quantity)
    setTotalQuantites(prevTotal => prevTotal - 1)

    // check if product is already in the cart
    const exist = cartItems.find(item => item.slug === product.slug)
    // console.log(exist);

    if (exist.quantity === 1) { // if a product has 1 quantity and a user clicks the minus button, the product will be removed from the cart
      setCartItems(cartItems.filter(item => item.slug !== product.slug))
    } else { /* 
                { ...exist, quantity: exist.quantity - 1 } -- keep the information about the product (image, title, slug) but just update the quantity by reducing it to one 
                
                : item -- or just keep the product as is
              */
      setCartItems(cartItems.map(item => item.slug === product.slug ? { ...exist, quantity: exist.quantity - 1 } : item))
    }

  }


  return (
    <ShopContext.Provider value={{ qty, increaseQty, decreaseQty, showCart, setShowCart, cartItems, onAdd, onRemove, totalQuantites, totalPrice }}>
      {children}
    </ShopContext.Provider>
  )

}

export const useStateContent = () => useContext(ShopContext);

