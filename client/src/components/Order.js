import OrderLine from "./OrderLine"
import React, { useState, useRef, useEffect } from 'react';
import "./Order.css"
import { Link } from "react-router-dom";

function Order(props) {

  /*option - for the delivery type
    message - if there is no items in the cart
    total - for the total price include delivery type*/
  const [option, setOption] = useState('choose');
  const [message,setMessage] = useState('Your cart is empty')
  const [total, setTotal] = useState(props.totalPrice);

  /*rendering in every change of totalPrice, 
    while the user is in order page and changes the quantity from the cart window - the price will update in the order page */
  useEffect(() => {
    setTotal(props.totalPrice + (option === "20" ? 20 : 0));
  }, [props.totalPrice]);

  //deliveryType - calculate the correct total price with the delivery type and set the option in field
  function deliveryType (event){
    if(event.target.value === "20"){
      setTotal(total+20)
    }else if(option === "20"){
      setTotal(total-20)
    }
    setOption(event.target.value);
  };
 

  //useRef - for getting the inputs values
  const firstNameInput = useRef('');
  const lastNameInput = useRef('');
  const phoneNumberInput = useRef('');
  const mailInput = useRef('');
  const deliveryAdressInput = useRef('');
  
  //useState error - for print on the screen the error for every field, initial with unbreak space
  const [firstNameErr, setFirstNameErr] = useState('\u00A0');
  const [lastNameErr, setLastNameErr] = useState('\u00A0');
  const [phoneNumberErr, setPhoneNumberErr] = useState('\u00A0');
  const [mailErr, setMailErr] = useState('\u00A0');
  const [deliveryAdressErr, setDeliveryAdressErr] = useState('\u00A0');
  const [deliveryTypeErr, setDeliveryTypeErr] = useState('\u00A0');

  //regex pattern - check the correct structure for phoneNumber and mail
  const regexPhonePattern = /^05(0|2|3|4|5|6|7|8|9)?\d{7}$/;
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  /*functions that work in every inputs change and check its input correctness, 
    if correct set unbreak space else show the error*/
  function setFirstNameError(){
    (firstNameInput.current.value.trim().length === 0 ?  setFirstNameErr('Must provide first name') : setFirstNameErr('\u00A0'))
  }
  function setLastNameError(){
    (lastNameInput.current.value.trim().length === 0 ? setLastNameErr('Must provide last name') : setLastNameErr('\u00A0'))
  }
  function setPhoneNumberError(){
    (!(regexPhonePattern.test(phoneNumberInput.current.value.trim())) ? setPhoneNumberErr('Must provide phone number') : setPhoneNumberErr('\u00A0'))
  }
  function setMailError(){
    (!(regexMail.test(mailInput.current.value.trim())) ? setMailErr('Must provide mail') : setMailErr('\u00A0'))
  }
  function setDeliveryAdressError(){
    (deliveryAdressInput.current.value.trim().length === 0 ? setDeliveryAdressErr('Must provide delivery adress') : setDeliveryAdressErr('\u00A0'))
  }
  function setDeliveryTypeError(){
    (option === "choose" ? setDeliveryTypeErr('Must provide delivery type') :  setDeliveryTypeErr('\u00A0'))
  }
 

  function completePurchase(){
    // check the inputs last time before sent it to the server 
    if(firstNameInput.current.value.trim().length !== 0 && 
      (lastNameInput.current.value.trim().length !== 0) && 
      (regexPhonePattern.test(phoneNumberInput.current.value.trim())) && 
      (regexMail.test(mailInput.current.value.trim())) && 
      (deliveryAdressInput.current.value.trim().length !== 0) && 
      (option !== "choose")){
      
      //create post request for the server
      fetch("http://localhost:3000/delivery",{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstNameInput.current.value,
          lastName: lastNameInput.current.value,
          phoneNumber: phoneNumberInput.current.value,
          mail: mailInput.current.value,
          deliveryAdress: deliveryAdressInput.current.value,
          deliveryType: option,
          items: props.items,
          total: total
        })
      })
      .then(response =>response.json())
      .then(data => {
        //set message after the order completed
        setMessage(data.message.replace(/\n/g, '<br>'))
        //clean the fields
        firstNameInput.current.value='';
        lastNameInput.current.value='';
        phoneNumberInput.current.value='';
        mailInput.current.value='';
        deliveryAdressInput.current.value='';
        setOption('choose')
        setTotal(0)
        //fetching the new data from the server after the order was made to update the client cart
        props.updateData()
      })
      .catch(error => console.error('Error fetching data:', error)) 
    
    //show errors
    }else{
      setFirstNameError()
      setLastNameError()
      setPhoneNumberError()
      setMailError()
      setDeliveryAdressError()
      setDeliveryTypeError()
    }
  }


  if(props.items.length===0){
    /*if the order sent show the order number and button to start shopping  
      else if there is no items in the cart show the cart is empty and button to start shopping  
    */
    return(
      <div>
        {/* convert /n to <br> to split the message*/}
        <p className='orderMessage' dangerouslySetInnerHTML={{ __html: message }}></p>
        <Link to="/" className='startShoppingOrder'>start shopping</Link>
      </div>
    )

  }else{
    return (
      <div>
        <div className = "orderContent">
            <ul className="ULOrderProduct">
              {/*map the data to show the items on the cient side by create li object to each product*/}
              {props.items.map((item) => (
                <li key={item.id}>
                  <OrderLine img={item.img} name={item.name} quantity={item.quantity} price={item.price} />
                </li>
              ))}
            </ul>
        </div>
        {/* fields for the client to fill in order and span objects for every field error */}
        <div className="costumerInfo">
          <h1>Delivery</h1>
          <div className="firstLastInputs">
            <div className="firstDiv">
              <input placeholder="First name" ref={firstNameInput} type="text" onBlur={setFirstNameError}/>
              <span className="Error">{firstNameErr}</span>
            </div>
            <div className="lastDiv">
              <input placeholder="Last name" ref={lastNameInput} type="text" onBlur={setLastNameError}/>
              <span className="Error">{lastNameErr}</span>
            </div>
          </div>
          <div className="inputsSpan">
            <input placeholder="Phone number - 05________" ref={phoneNumberInput} type="text" onBlur={setPhoneNumberError}/>
            <span className="Error">{phoneNumberErr}</span>
          </div>
          <div className="inputsSpan">
            <input placeholder="Mail" ref={mailInput} type="text" onBlur={setMailError}/>
            <span className="Error">{mailErr}</span>
          </div>
          <div className="inputsSpan">
            <input placeholder="Delivery Adress" ref={deliveryAdressInput} type="text" onBlur={setDeliveryAdressError}/>
            <span className="Error">{deliveryAdressErr}</span>
          </div>
          <div className="inputsSpan">
            <select value={option} onChange={deliveryType} onBlur={setDeliveryTypeError}>
              <option value="choose">Choose Delivery Type</option>
              <option value="20">3 Days - 20₪</option>
              <option value="FREE">14 Days - FREE</option>
            </select>
            <span className="Error">{deliveryTypeErr}</span>
          </div>
          <p>Total: {total}₪</p>
          <button id="completePurchase" onClick={completePurchase}>Complete Purchase</button>
        </div>
    </div>
    );
  }
};
  
export default Order;