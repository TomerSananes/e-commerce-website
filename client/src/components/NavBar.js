import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState,useEffect } from 'react';
import NavHeader from './NavHeader';
import Home from './Home';
import Order from './Order';
import NotFound from './NotFound';


function NavBar(props) {

  //useState items - contain the items with quantity bigger then 0
  const [items, setItems] = useState([])
  //when the data change, update the items
  useEffect(() => {
    const filteredItems = props.data.filter(item => item.quantity > 0);
    setItems(filteredItems);
  }, [props.data]);
  

  /*useState totalPrice - contain the price of the items in the cart
    useState itemsNumber - contain the number of items in the cart
  */
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemsNumber, setItemsNumber] = useState(0)
  //when the items change, update the itemsNumber and totalPrice
  useEffect(() => {
    const price = items.reduce((acc, item) => acc + (parseFloat(item.price) * parseInt(item.quantity)), 0);
    const item = items.reduce((acc, item) => acc + parseInt(item.quantity), 0);
    setTotalPrice(price);
    setItemsNumber(item);
  }, [items]);
  

  return (
    <Router>
      <div>
          <NavHeader items={items} totalPrice={totalPrice} updateQuantity={props.updateQuantity} cartBox={props.cartBox} isCartOpen={props.isCartOpen} itemsNumber={itemsNumber}/>
          <Routes>
              <Route path="/" element={<Home data={props.data} updateQuantity={props.updateQuantity}/>} />
              <Route path="/Order" element={<Order items={items} totalPrice={totalPrice} updateData={props.updateData}/>} />
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </div>
    </Router>
  );
}
  
export default NavBar;