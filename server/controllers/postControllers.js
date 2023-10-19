import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;

    const companyId = req.user.userCompany;

    //const image = faker.image.url();

    const newPost = await Post.create({
      ...req.body,
      createdBy: userId,
      company: companyId,
    });

    res.json(newPost);
  } catch (error) {
    res.json(error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const companyId = req.user.userCompany;
    const posts = await Post.find({ company: companyId }).populate("createdBy");
    // console.log(posts);
    res.json(posts);
  } catch (error) {
    res.json(error.message);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ createdBy: userId }).populate("createdBy");

    res.json(posts);
  } catch (error) {
    res.json(error.message);
  }
};
