import express from "express";
import { sequelize } from "./db/models/connect";
import { Market } from "./db/models/market";
import { ProductAttributeValue } from "./db/models/product-attribute-value";
import { ProductAttribute } from "./db/models/product-attribute";

const app = express();

app.listen(5000, () => {
  console.log("App is starting on port : " + "5000");
});
