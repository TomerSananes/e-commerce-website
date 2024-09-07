import NavBar from './components/NavBar';
import React, { useState ,useEffect } from 'react';


function App() {

  // useState data - contain all the products from the server 
  const [data, setData] = useState([]);
  //updateData - fetch the products from the server and set the client data
  function updateData(){
    fetch("http://localhost:3000/items")
    .then(response => response.json())
    .then(data => setData(data.items))
    .catch(error => console.error('Error fetching data:', error));
  }
  useEffect(() => {
    updateData()
  },[]);


  //useState isCartOpen - open and close the cart window according to the current position
  const [isCartOpen, setIsCartOpen] = useState(false);
  function cartBox () {
    setIsCartOpen(!isCartOpen)
  }


  //updateQuantity - update quantity of product by sending the products id and new quantity to the server
  function updateQuantity(id,quantity){
    fetch("http://localhost:3000/items/"+id,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: quantity
      })
    })
    .then(response =>response.json())
    .then(newQuantity => {
      //if the update completed successfully update the quantity of the product in the client side and open the cart window
      setData(data.map(item => item.id === id ? { ...item, quantity: newQuantity.message} : item))
      setIsCartOpen(true)
    })
    .catch(error => console.error('Error fetching data:', error)) 
  }


  return (
    <div style={{textAlign: "center"}}>
      <NavBar data={data} updateQuantity={updateQuantity} updateData={updateData} cartBox={cartBox} isCartOpen={isCartOpen}/>
    </div>
  );
}

export default App;
