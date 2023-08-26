const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
