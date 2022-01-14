import { request } from "express";
import PostMessage from "./models/postMessage.js";

export const getUser = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const post = req.body;
  console.log("Submit worked", post);
  console.log("hit");

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("iddddddd", id);
  const post = req.body;
  console.log("Submit worked", post);
  console.log("hit");

  const newPost = new PostMessage(post);
  console.log("newpost", post.grossCoins);
  try {
    await PostMessage.updateOne(
      { _id: id },
      { $set: { grossCoins: newPost.grossCoins, leadCoins: newPost.leadCoins } }
    );
    res.status(201).json(newPost);
  } catch (error) {
    console.log("error exceuted");
    res.status(409).json({ message: error.message });
  }
};
