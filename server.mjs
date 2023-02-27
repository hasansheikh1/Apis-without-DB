console.log("Server Mjs running");

// const express = require('express')// The require keyword in this line of code is of old JS that's why iw ont work on express or mjs
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5001;
let products = []; // Todo connect with MongoDb instead

app.use(cors());
app.use(express.json());

app.post("/Product", (req, res) => {
  const body = req.body;
  if (
    // validation
    !body.name ||
    !body.price ||
    !body.description
  ) {
    res.status(400).send({
     message: "required params missing"

    });
    return;
  }

  console.log(body.name);
  console.log(body.price);
  console.log(body.description);

  products.push({
    id: `${new Date().getTime()}`,
    name: body.name,
    price: body.price,
    description: body.description,
  });
  res.send({ 
    message:"Product added successfully"
});
});

app.get("/products", (req, res) => {
  res.send({
    message: "All products",
    data: products
  });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {    
      res.send({
        message:"get product by id:"+products[i].id,
        data:products[i]
      })
      isFound = true;
      break;
    }
  }

  if (isFound === fasle) {
    res.status(404);
    res.send({
      message:"Product not found"
  });
  }
  return;
});


app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      
      products.splice(i,1);
      res.send({

       message:"Product Deleted Successfully"
      }
      );
      isFound = true;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
     message: "Product not found"
    });
  }
  return;
});


app.put('/product/:id',(req,res)=>{

  const body = req.body;
  const id = req.params.id;
  if (
    // validation
    !body.name &&
    !body.price &&
    !body.description
  ) {
    res.status(400).send({
     message: "required params missing"
    });
    return;
  }

  console.log(body.name);
  console.log(body.price);
  console.log(body.description);

  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      
      products[i].name=body.name;
      products[i].price=body.price;
      products[i].description=body.description;
      
      res.send("Product Modified Successfully");
      isFound = true;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({
    message: "Updation failed!: Product not found"
    });
  }
  res.send({
  message:"Hello World!"
  });

})

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "./web/build")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
