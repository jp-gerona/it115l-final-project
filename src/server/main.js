import express from "express";
import ViteExpress from "vite-express";

const app = express();
const port = 3000;

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);
