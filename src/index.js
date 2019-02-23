import express from "express";

import constants from "./config/constants";
import "./config/database";

const app = express();

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
    ---
    Server running on port : ${constants.PORT}
    ---
    Running on ${process.env.NODE_ENV}
    ---
    `);
  }
});
