import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {

  // add data for the state
  const [qty, setQty] = useState(1)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])

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

  return (
    <ShopContext.Provider value={{ qty, increaseQty, decreaseQty, showCart, setShowCart }}>
      {children}
    </ShopContext.Provider>
  )

}

export const useStateContent = () => useContext(ShopContext);