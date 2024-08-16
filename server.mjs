import express from "express";
import handler from "./handler.mjs";

const app = express();
const port = 4915;

app.get("/", (_, res) => {
  try {
    res.send(handler());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
