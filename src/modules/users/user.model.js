import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { hashSync, compareSync } from "bcryptjs";

import { passwordReg } from "./user.validations";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "{VALUE} is not valid email"
    }
  },
  firstName: {
    type: String,
    required: [true, "FirstName is required!"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "LastName is required!"],
    trim: true
  },
  userName: {
    type: String,
    required: [true, "UserName is required!"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [0, "Password need to be longer"], // not required really
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: "{VALUE} is not a valid password"
    }
  }
});

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this._hashpassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashpassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  }
};

export default mongoose.model("user", UserSchema);