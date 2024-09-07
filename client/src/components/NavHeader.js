import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg"
import homeLogo from "../images/homeLogo.png"
import shoppingCart from "../images/shoppingCart.png"
import Cart from "./Cart"
import "./NavHeader.css";


function NavHeader(props) {
    return(
        <>
        <header className="NavHeader">
            <ul className="NavHeaderUL">
                <li><Link to="/"><img src={homeLogo} className="homeImg"></img></Link></li>
                <li><Link to="/"><img src={logo} className="logoImg"></img></Link></li>
                <li>
                    <span className="counterItems">{props.itemsNumber}</span>
                    <span className="counterPrice">{props.totalPrice}₪</span>
                    <img src={shoppingCart} className="cartImg" onClick={props.cartBox}></img>
                </li>
            </ul>
        </header>
        {/*if isCartOpen is true show the cart window*/}
        {props.isCartOpen && <Cart Close={props.cartBox} items={props.items} totalPrice={props.totalPrice} updateQuantity={props.updateQuantity}/>}
        </> 
    )
}

export default NavHeader