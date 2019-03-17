import joi from "joi";

export default {
  createPost: {
    body: {
      title: joi
        .string()
        .min(3)
        .required(),
      text: joi
        .string()
        .min(10)
        .required()
    }
  },
  updatePost: {
    body: {
      title: joi.string().min(3),
      text: joi.string().min(10)
    }
  }
};
