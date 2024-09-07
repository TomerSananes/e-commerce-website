const express = require('express');
const mongojs = require("mongojs");


const db = mongojs(
  'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024'
);


//COLLECTIONS - one for products and the other one for orders
const products = db.collection('final_<tomer_roni>_products'); 
const orders = db.collection('final_<tomer_roni>_orders');


const app = express();
app.use(express.json()); 


// GET request to get the products from the database
app.get('/items', (req, res) => {
  products.find({},(err,docs)=>{
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(202).json({items: docs});
    }
  })  
});


/* POST request - add new order to the database
  the requset get - [firstName, lastName, phoneNumber, mail, deliveryAdress, deliveryType, items, total]
  and check that every variable exist and correct, check if items and total is the same as it shows in the database 
*/
app.post('/delivery', (req, res) => {
  //regex pattern - check the correct structure for phoneNumber and mail
  const regexPhonePattern = /^05(0|2|3|4|5|6|7|8|9)?\d{7}$/;
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (! (req.body.firstName && req.body.firstName.trim().length > 0)){
    res.status(400).json({ error: 'Must provide first name' });
  }else if (! (req.body.lastName && req.body.lastName.trim().length > 0)){
    res.status(400).json({ error: 'Must provide last name' });
  }else if (! (regexPhonePattern.test(req.body.phoneNumber.trim()))){
    res.status(400).json({ error: 'Must provide phone number' });
  }else if (! (req.body.mail && regexMail.test(req.body.mail.trim()) )){
    res.status(400).json({ error: 'Must provide valid mail' });
  }else if (! (req.body.deliveryAdress && req.body.deliveryAdress.trim().length > 0)){
    res.status(400).json({ error: 'Must provide delivery adress' });
  }else if (req.body.deliveryType === "choose"){
    res.status(400).json({ error: 'Must provide delivery type' });
  }else if (! (req.body.items)){
    res.status(400).json({ error: 'Must provide items' });
  }else if (! (req.body.total)){
    res.status(400).json({ error: 'Must provide total price' });
  }else{

    // find with $gte: 1 - find all the products with quantity that equals or higher then one
    products.find({quantity:{$gte: 1}},(err,docs)=>{  
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
        /* if there are products with quantity bigger then 0 get in the if, 
        else return 404 - there are no products in the cart*/ 
        if(docs.length!==0){
          /*go through the server items and the items that come from the client and check if they match by ID and QUANTITY,
           if they dont return 400 - item dont match*/
          for(i=0; i<docs.length ;i++){
            flag = true
            for(j=0; j<req.body.items.length && flag ;j++){
              if(req.body.items[j].id === docs[i].id && req.body.items[j].quantity === docs[i].quantity){ //id and quantity are the most important variables to check if the items match
                flag = false
              }
            }
            if(flag){
              return res.status(400).json({ error: 'Items dont match' });
            }
          }

          //calculate the total price and check if the price match to the price that come from the client. 
          let productsPrice = 0
          docs.map(item => {
            productsPrice = productsPrice + item.quantity*parseInt(item.price);
          })
          const total = productsPrice + (req.body.deliveryType==="20" ? 20 : 0)
          if(total !== req.body.total){
            return res.status(400).json({error: 'Total price doesnt match' });
          }

          //create new delivery object
          const newDelivery = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName ,
            'phoneNumber': req.body.phoneNumber,
            'mail': req.body.mail,
            'deliveryAdress': req.body.deliveryAdress,
            'products': docs,
            'products price': productsPrice,
            'deliveryType': req.body.deliveryType,
            'total': total
          }
          
          //insert the new delivery to the orders collection
          orders.insert(newDelivery, (err, doc)=>{
            if (err) {
              res.status(500).json({error: 'Internal Server Error' });
            } else {
              res.status(201).json({message: "Order completed successfully"+'\n'+ "Your order number is: " + doc._id});
              // if the order completed successfully reset the quantity to zero
              docs.map(item=>{
                item.quantity = 0;
                products.save(item)
              })
            }
          })

        } else {
          res.status(404).json({error: 'There are no products in the cart'});
        }
      }
    })
  }
});


/* PUT request - update product quantity
  the requset get - [id, quantity]
  find the product by the id and update its quantity
*/
app.put('/items/:id', (req, res) => {
  products.findOne({id:parseInt(req.params.id)}, (err, doc) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (doc) {
        doc.quantity = req.body.quantity
        products.save(doc)
        res.status(202).json({message: doc.quantity});
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    }
  });
});


// Start the server on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});