import HttpStatus from "http-status-codes";
import User from "./user.model";

export async function signup(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(HttpStatus.CREATED).json(user);
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
}

export function login(req, res, next) {
  res.status(HttpStatus.OK).json(req.user);

  return next();
}
