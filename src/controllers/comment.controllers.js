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

module.exports = router;
