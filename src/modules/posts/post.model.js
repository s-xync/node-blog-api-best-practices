import mongoose, { Schema } from "mongoose";
import slug from "slug";
import uniqueValidator from "mongoose-unique-validator";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required!"],
      minlength: [3, "Title need to be longer!"],
      unique: true
    },
    text: {
      type: String,
      trim: true,
      required: [true, "Text is required!"],
      minlength: [10, "Text need to be longer!"]
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

PostSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!"
});

PostSchema.pre("save", function(next) {
  this._slugify();

  next();
});

PostSchema.methods = {
  _slugify() {
    // lowercase and dashes to use in URL
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      slug: this.slug,
      user: this.user,
      favoriteCount: this.favoriteCount
    };
  }
};

PostSchema.statics = {
  createPost(args, user) {
    return this.create({
      ...args,
      user
    });
  },
  list({ skip = 0, limit = 5 } = {}) {
    // if controller does not give anything, then we take default values else we take what is given by controller

    // skip skips the first few posts
    // limit limits the no of posts

    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
  }
};

export default mongoose.model("post", PostSchema);
