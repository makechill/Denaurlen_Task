import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", postRoutes);

const PORT = process.env.PORT || 8000;
// const CONNECTION_URL =
//   "mongodb+srv://admin:denaurlen@denaurlen.alzr5.mongodb.net/DENAURLEN?retryWrites=true&w=majority";

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Hello Listened! on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
