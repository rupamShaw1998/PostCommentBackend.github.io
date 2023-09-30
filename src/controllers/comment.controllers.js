const express = require("express");
const Comment = require("../models/comment.models");
const authTokenVerification = require("../middleware/auth");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { authorId, postId, text } = req.body;

    const comment = await Comment.create({ authorId, postId, text });
    return res.status(201).send(comment);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/get-comments/:postId", authTokenVerification, async (req, res) => {
  try {
    const comments = await Comment.find({postId: req.params.postId}).lean().exec();
    return res.status(200).send(comments);
  } catch (err) {
      return res.status(500).send(err);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedComment) {
      return res.status(404).send("Comment not found");
    }
    return res.status(201).send(updatedComment);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if(!deletedComment) {
      return res.status(404).send("Comment not found");
    }
    return res.status(200).send("Comment deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
