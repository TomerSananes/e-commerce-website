import "./OrderLine.css"

function OrderLine(props) {
  //fields needed for each product in order line
  return (
    <div class="orderLine">
      <div class="imageANDtext">
        <img src={props.img}/>
        <div className="nameQuantityPrice">
            <p className="OrderProductName">{props.name}</p>
            <div className="priceQuantity">
                <p>Qty: {props.quantity}</p>
                <p>Price: {props.price}</p>
            </div>
        </div>
      </div>
      <div>
        {/* total price of the product calaulate by price*quantity */}
        <p className="TotalOrder">Total: {parseInt(props.price)*parseInt(props.quantity)}₪</p>
      </div>
    </div>
  );
}

export default OrderLine;