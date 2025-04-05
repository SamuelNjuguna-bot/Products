import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router()
const routes = router.route('/')

// Adding Product
routes.post(async (req, res) => {
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
})


// Getting All Products
routes.get(async(req, res) => {
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
    
    })


//Getting Specific Product
const productWithID = router.route("/:productID") 
productWithID.get(async(req, res) => {
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


// Updating a product

productWithID.patch(async(req, res) => {
    const productID = req.params.productID;
    const {productName, description, remaining_products, price, isOnOffer} = req.body
    const updated = await prisma.products.update({
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

    if(updated){
        res.send({
            message:"Updated Product  Successfully"
        })
    }
    
  })


//   Deleting A product
productWithID.delete(async(req, res) => {
  const productID = req.params.productID
  console.log(productID)
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
  
})
//   
export default router