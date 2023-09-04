const express = require('express');
const cors = require('cors');
const userController = require('./controllers/user.controllers');
const postController = require('./controllers/post.controllers');
const commentController = require('./controllers/comment.controllers');

require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userController);
app.use("/post", postController);
app.use("/comment", commentController);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
