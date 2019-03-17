import { Router } from "express";

import * as postController from "./post.controllers";
import { authJwt } from "../../services/auth.services";

const routes = new Router();

routes.post("/", authJwt, postController.createPost);

export default routes;
