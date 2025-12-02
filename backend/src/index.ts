import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}...`);
});
