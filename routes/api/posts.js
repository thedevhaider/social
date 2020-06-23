const express = require("express");
const router = express.Router();

//Load Model
const Post = require("../../models/Post");

//Load Validation
const validatePostInput = require("../../validation/post");

// @routes     GET api/posts/healthcheck
// @desc       Tests posts routes
// @access     Public
router.get("/healthcheck", (req, res) => res.json({ user: "Posts Working" }));

// @routes     POST api/posts
// @desc       Create Post
// @access     Private
router.post(
    "/",
    (req, res) => {
      //Validation
      const { errors, isValid } = validatePostInput(req.body);
  
      if (!isValid) {
        //Return with status 400 along with errors
        return res.status(400).json(errors);
      }
  
      const newPost = new Post({
        text: req.body.text,
        author: req.body.author
      });
  
      newPost.save().then(post => res.json(post));
    }
);

// @routes     GET api/posts
// @desc       Get all posts
// @access     Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

// @routes     GET api/posts/id
// @desc       Get post by id
// @access     Public
router.get("/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No post found" }));
});

// @routes     DELETE api/posts/id
// @desc       Delete post by id
// @access     Private
router.delete(
  "/:id",
  (req, res) => {
    Post.findById({ _id: req.params.id })
        .then(post => {
          //Delete the post
          post.remove().then(() => res.json({ sucess: true }));
        })
        .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

// @routes     POST api/posts/comment/:post_id
// @desc       Comment on a Post
// @access     Private
router.post(
  "/comment/:post_id",
  (req, res) => {
    Post.findById({ _id: req.params.post_id })
        .then(post => {
          //Validation
          const { errors, isValid } = validatePostInput(req.body);

          if (!isValid) {
            //Return with status 400 along with errors
            return res.status(400).json(errors);
          }

          const newComment = {
            text: req.body.text,
            author: req.body.author
          };

          //Add comment in the array
          post.comments.unshift(newComment);

          //Saving it to db
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

// @routes     DELETE api/posts/comment/:post_id/:comment_id
// @desc       Delete a comment
// @access     Private
router.delete(
  "/comment/:post_id/:comment_id",
  (req, res) => {
    Post.findById({ _id: req.params.post_id })
        .then(post => {
          //Check if the comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexist: "Comment does not exists" });
          }

          //Get index of comment
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          //Splice the comment out
          post.comments.splice(removeIndex, 1);

          //Save it to db
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

module.exports = router;
