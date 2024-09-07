import "./Cart.css"
import CartLine from "./CartLine"
import { Link } from "react-router-dom";


function Cart(props) {

  function emptyCart(){  
    // if cart is empty show message and button to start shopping  
    if(props.items.length===0){
      return(
        <div>
          <p className='emptyCart'>Your cart is empty</p>
          <button onClick={props.Close} className='startShopping'>start shopping</button>
        </div>
      )
    //else show the items and the checkout button
    }else{
      return(
        <div className='cartContent'>
          <ul className='cartUl'>
            {/* map the data to show the items on the cient side by create li object to each product */}
            {props.items.map((item, index) => (
              <li key={item.id}>
                <CartLine id={item.id} quantity={item.quantity} img={item.img} name={item.name} price={item.price} updateQuantity={props.updateQuantity}/>
              </li>
            ))}
          </ul>
          <p className='totalPriceCart'>Total: {props.totalPrice}₪</p>
          <Link to="/Order" className="checkoutButton" onClick={props.Close}>CHECKOUT</Link>
        </div>
      )
    }
  }


  return (
    <div className="cartBox">
      <div className='cartHeadline'>
        <h4 className='yourCart'>Your Cart</h4>
        <button onClick={props.Close} className='cartCloseButton'>X</button>
      </div>
      {emptyCart()}
    </div>
  );
};
  
export default Cart;