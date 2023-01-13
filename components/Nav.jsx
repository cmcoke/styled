import Link from "next/link"
import { FiShoppingBag } from 'react-icons/fi'
import { NavStyles, NavItems } from '../styles/NavStyles'
import Cart from "./Cart"
import { useStateContent } from '../lib/context'

const Nav = () => {

  const { showCart, setShowCart, totalQuantites } = useStateContent();

  return (
    <NavStyles>

      <Link href={'/'}>Styled.</Link>

      <NavItems>

        <div onClick={() => setShowCart(true)}>
          {totalQuantites > 0 && <span>{totalQuantites}</span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>

      </NavItems>

      {showCart && <Cart />}

    </NavStyles>
  )
}
export default Nav