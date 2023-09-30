const express = require("express");
const Post = require("../models/post.models");
const authTokenVerification = require("../middleware/auth");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { authorId, content } = req.body;

    const post = await Post.create({ authorId, content });
    return res.status(201).send(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/get-posts", authTokenVerification, async (req, res) => {
  try {
    const posts = await Post.find().lean().exec();
    return res.status(200).send({user: req.user,posts});
  } catch (err) {
      return res.status(500).send(err);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedPost) {
      return res.status(404).send("Post not found");
    }
    return res.status(201).send(updatedPost);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if(!deletedPost) {
      return res.status(404).send("Post not found");
    }
    return res.status(200).send("Post deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
