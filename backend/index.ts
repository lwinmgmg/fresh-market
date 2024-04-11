import express from "express";
import { router as productRouter } from "./api/rest/products/v1";
import LoggerMw from "./middlewares/logger";
import cors from "cors";

const app = express();

// CORS
app.use(cors());

app.use(LoggerMw, express.json());

app.use("/api/rest/products", productRouter);

app.listen(5000, () => {
  console.log("App is starting on port : " + "5000");
});

export default app;
