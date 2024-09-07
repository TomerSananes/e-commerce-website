import "./CartLine.css"

function CartLine(props) {
  //fields needed for each product in cart line
  return (
    <div class="cartLine">
      <img src={props.img}/>
      <div>
        <p className="cartLineProductName">{props.name}</p>
        <div className="priceQtyLine">
          {/* - button call updateQuantity and remove one from the exist quantity */}
          <button onClick={() => props.updateQuantity(props.id, props.quantity-1)} className="upDown">-</button>
          <p>{props.quantity}</p>
          {/* + button call updateQuantity and add one to the exist quantity */}
          <button onClick={() => props.updateQuantity(props.id, props.quantity+1)} className="upDown">+</button>
          <p className="cartLinePrice">Price: {props.price}</p>
        </div>
      </div>
      <div className="totalANDdelete">
        {/* total price of the product calaulate by price*quantity */}
        <p className="TotalCartLine">Total: {parseInt(props.price)*parseInt(props.quantity)}₪</p>
        {/* delete button call updateQuantity and set the quantity to zero and remove from the cart items */}
        <button onClick={() => props.updateQuantity(props.id, 0)} className="deleteCartLine">Delete</button>
      </div>
    </div>
  );
}
  
export default CartLine;