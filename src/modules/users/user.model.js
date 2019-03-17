import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

import { passwordReg } from "./user.validations";
import constants from "../../config/constants";

const UserSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!"
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
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      token: `JWT ${this.createToken()}`
    };
  },
  toJSON() {
    // this is a inbuilt function and we are overriding it
    // this is generally used when res.json is used or something like that(populate by another object)
    return {
      _id: this._id,
      userName: this.userName
    };
  }
};

export default mongoose.model("user", UserSchema);
