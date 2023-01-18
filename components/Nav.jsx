import Link from "next/link"
import { FiShoppingBag } from 'react-icons/fi'
import { NavStyles, NavItems } from '../styles/NavStyles'
import Cart from "./Cart"
import { useStateContent } from '../lib/context'
import User from "./User"
const { AnimatePresence, motion } = require("framer-motion")



const Nav = () => {

  const { showCart, setShowCart, totalQuantites } = useStateContent();

  return (
    <NavStyles>

      <Link href={'/'}>Styled.</Link>

      <NavItems>

        <User />

        <div onClick={() => setShowCart(true)}>
          {totalQuantites > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} >{totalQuantites}</motion.span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>

      </NavItems>

      {/* allows the Cart component to perform it's exist animation when it unmounts. The exit animation is written in the Cart component  */}
      <AnimatePresence>
        {showCart && <Cart />}
      </AnimatePresence>

    </NavStyles>
  )
}
export default Nav