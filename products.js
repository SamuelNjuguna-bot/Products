import express from "express";
import { data } from "react-router-dom";
import { PrismaClient } from "@prisma/client";
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

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

app.get("/products", (req, res) => {
  res.send("Getting All the Products");
});

app.get("/products/:id", (req, res) => {
  res.send("Getting a Specific Product");
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
