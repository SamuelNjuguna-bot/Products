import express from "express";
import { data } from "react-router-dom";
import { PrismaClient } from "@prisma/client";
const app = express();

const prisma = new PrismaClient();

app.use(express.json());


//Creating a Product
app.post("/product", async (req, res) => {
  const prod = req.body;
  try {
    const createdProduct = await prisma.products.create({
      data: {
        productsTitle: prod.Product_name,
        productsDescription: prod.description,
        unitsLeft: prod.remaining_products,
        pricePerProduct: prod.price,
        isOnOffer: prod.isOnOffer,
      },
    });
    if (createdProduct) {
      res.send({
        message: "successfully Added a Product",
      });
    }
  } catch (e) {
    console.log("Mmmh It seems there to be an issue with our server");
  }
});


//Getting All Products
app.get("/products", async(req, res) => {
try{
    const all = await prisma.products.findMany();
    if(all){
        res.send({
            message:"All Products",
            data: all
        })
    }
}
catch(e){
    console.log("There Was some was an error please try again")
}

});

//Getting Specific Product
app.get("/products/:id", async(req, res) => {
try{
    const productID = req.params.id
    var specificProduct = await prisma.products.findFirst({
        where:{
            productID
        }
    })

}
catch(e){
    console.log("An internal error Occured")
}
if(specificProduct){
    res.send({
        message:"Your Product",
        data:specificProduct
    })
}
});


// Updating a Product
app.patch("/products/:productID", async(req, res) => {
  const productID = req.params.productID;
  const {productName, description, remaining_products, price, isOnOffer} = req.body
  await prisma.products.update({
    where:{
        productID
    },
    data:{
        productsTitle: productName&&productName,
        productsDescription: description&&description,
        unitsLeft:remaining_products && remaining_products,
        pricePerProduct: price && price,
        isOnOffer: isOnOffer&&isOnOffer
    }
    
  });
  
});


//Deleting A Product
app.delete("/products/:productID", async(req, res) => {
  const productID = req.params.productID
   const deleted = await prisma.products.delete({
    where:{
        productID
    }
   });
   if(deleted){
    res.send({
        message: "Product deleted successfully"
    })
   }
  
});

//All Products On Offer
app.get("/offer/products", async(req, res) => {
    const productsOnoffer = await prisma.products.findMany({
        where:{
            isOnOffer:false
        }
    });
    if(productsOnoffer){
        res.send({
            message:"product on Offer",
            data:productsOnoffer
        })
    }
});

app.listen(3000, () => {
  console.log("Server Running on port 3000....");
});
