import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const app = express();

app.listen(process.env.PORT || 8080, () => {
    console.log(
      "server listening on port http://localhost:" + process.env.PORT + " ✅"
    );
  });