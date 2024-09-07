import "./Product.css"

function Product(props) {
  //fields needed for each product
  return (
    <div>
      <img src={props.img} className="productImg"/>
      <h3>{props.name}</h3>
      <p>{props.txt}</p>
      <p>{props.price}</p>
      {/* Add button call updateQuantity and add one to the exist quantity */}
      <button className="itemButton" onClick={() => props.updateQuantity(props.id, props.quantity+1)}>Add</button>
    </div>
  );
}
  
export default Product;