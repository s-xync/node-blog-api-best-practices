import mongoose from "mongoose";

import constants from "./constants";

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
} catch (err) {
  throw err;
}

mongoose.connection
  .once("open", () => console.log("MongoDB Connected"))
  .on("error", err => {
    throw err;
  });
