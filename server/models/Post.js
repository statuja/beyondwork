import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    createdOn: { type: Date, default: Date.now },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    like: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const Post = model("Post", postSchema);

export default Post;
