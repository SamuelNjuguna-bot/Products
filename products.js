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
app.get("/products", async (req, res) => {
  try {
    const all = await prisma.products.findMany();
    if (all) {
      res.send({
        message: "All Products",
        data: all,
      });
    }
  } catch (e) {
    console.log("There Was some was an error please try again");
  }
});

//Getting Specific Product
app.get("/products/:id", async (req, res) => {
  try {
    const productID = req.params.id;
    const specificProduct = await prisma.products.findFirst({
      where: {
        productID,
      },
    });
    console.log(specificProduct);
  } catch (e) {
    console.log("An internal error Occured");
  }
});

app.patch("/products/:productID", (req, res) => {
  const id = req.params.productID;
  res.send(`Successfully updated a product with id ${id}`);
});

app.delete("/products/:productID", (req, res) => {
  res.send("Succesfully deleted Item X");
});

app.get("/products/:productID", (req, res) => {
  res.send("Getting All Items On Offer");
});

app.listen(3000, () => {
  console.log("Server Running on port 3000....");
});
