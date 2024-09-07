import Product from "./Product";
import backgroundLogo from "../images/backgroundLogo.jpeg"
import "./Home.css"


function Home(props) {

    return (
      <div className="Home">
        <img src={backgroundLogo} className="backgroundLogo"/>
        <div className="text">
          <h2 className="slogen">Once you try you get addicted!</h2>
          <p className="about">Our store was founded in 1999 out of a love for shoes and a desire 
            to bring global fashion to every customer in Israel. Each shoe is carefully 
            selected with comfort, quality and style in mind.</p>
          <h4>we are placed in dream place 123, open every day from 9AM to 8PM</h4>
        </div>

        <ul className='HomeList'>
          {/*map the data to show the items on the cient side by create li object to each product*/}
          {props.data.map(item => (
            <li className="item" key={item.id}>
              <Product id={item.id} quantity={item.quantity} img={item.img} name={item.name} txt={item.txt} price={item.price} updateQuantity={props.updateQuantity}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default Home;
  