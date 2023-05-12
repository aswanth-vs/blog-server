const posts = require("../models/postSchema");

const pendingposts = require("../models/pendingpostSchema");
const accounts = require("../models/accountSchema");
const jwt = require("jsonwebtoken");

exports.createPost = async (req, res) => {
  const { username, date, title, content } = req.body;
  console.log(req.body);
  try {
    const account = await accounts.findOne({ username: username });
    if (account) {
      const post = new pendingposts({ username, date, title, content });
      await post.save();
      res.status(200).json("Post created");
    } else {
      res.status(404).json("Account not Found");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};
