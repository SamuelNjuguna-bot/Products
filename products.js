import express from "express";
import { data } from "react-router-dom";

import router from "./routes/productRouter.js";
import router2 from "./routes/productsOnOffer.js";
const app = express();


app.use(express.json());
app.use("/products", router);
app.use("/offer/", router2)


app.listen(3000, () => {
  console.log("Server Running on port 3000....");
});
