import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const companyId = req.user.userCompany;

    const newPost = await Post.create({
      content: req.body.content,
      image: req.file ? req.file.filename : null,
      createdBy: userId,
      company: companyId,
    }).then((item) =>
      item.populate({ path: "createdBy", select: "userFullName userImage" })
    );

    res.json(newPost);
  } catch (error) {
    res.json(error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const companyId = req.user.userCompany;
    const posts = await Post.find({ company: companyId })
      .populate({
        path: "createdBy",
        select: "userFullName userImage",
      })
      .sort("-_id");
    // console.log(posts);
    res.json(posts);
  } catch (error) {
    res.json(error.message);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ createdBy: userId })
      .populate("createdBy")
      .sort("-_id");

    res.json(posts);
  } catch (error) {
    res.json(error.message);
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId });

    res.json(post);
  } catch (error) {
    res.json(error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.body.postId;

    const post = await Post.findOneAndDelete({ _id: postId });

    res.json(post);
  } catch (error) {
    res.json(error.message);
  }
};

export const editPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const newContent = req.body.content;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content: newContent },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.json(error.message);
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    console.log(req.params);
    let postQuery = await Post.findById(postId);
    if (postQuery) {
      const userCheck = postQuery.likedBy.includes(userId);
      console.log(userCheck);
      if (!userCheck) {
        const doc = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { likedBy: userId }, $inc: { like: 1 } },
          { new: true }
        ).populate({
          path: "createdBy",
          select: "userFullName userImage",
        });
        if (doc) {
          res.json(doc);
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      } else {
        const doc2 = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likedBy: userId }, $inc: { like: -1 } },
          { new: true }
        ).populate({
          path: "createdBy",
          select: "userFullName userImage",
        });
        if (doc2) {
          res.json(doc2);
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while liking the post." });
  }
};

