import HttpStatus from "http-status-codes";

import Post from "./post.model";

export async function createPost(req, res) {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HttpStatus.CREATED).json(post);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostById(req, res) {
  try {
    // populate will populate the user field with real user object
    const post = await Post.findById(req.params.id).populate("user");
    return res.status(HttpStatus.OK).json(post);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json(e);
  }
}
