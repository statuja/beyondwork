import { Schema, model } from "mongoose";

const postSchema = new Schema({
  content: { type: String, required: true },
  image : {type : String} ,
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
},   
    { versionKey: false }
);

const Post = model("Post", postSchema);

export default Post;
