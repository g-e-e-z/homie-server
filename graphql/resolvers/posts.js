const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const User = require("../../models/User");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    // createPost(_, args, context, info) {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
      });
      const post = await newPost.save();

      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      // console.log(user._doc);
      // Veritfy Post Exists
      post = await Post.findById(postId);
      // Check if user has already liked it
      if (post) {
        if (user.liked.find((post) => post.postId === postId)) {
          // console.log("User has already liked this post");
        } else if (user.disliked.find((post) => post.postId === postId)) {
          // console.log("User has disliked this post, switch to like");
          const postIndex = user.disliked.findIndex((p) => p.id == postId);
          user.disliked.splice(postIndex, 1);
          post.likes += 1;
          post.dislikes -= 1;
        } else {
          // console.log("else block");
          user.liked.push({
            postId,
          });
          post.likes += 1;
          await post.save();
          await user.save();
        }
        return post;
      } else throw new UserInputError("Post not found");
    },

    async dislikePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      // Veritfy Post Exists
      post = await Post.findById(postId);
      // Check if user has already liked it
      if (post) {
        if (user.disliked.find((post) => post.postId === postId)) {
          // console.log("User has already disliked this post");
        } else if (user.liked.find((post) => post.postId === postId)) {
          // console.log("User has liked this post, switch to dislike");
          const postIndex = user.liked.findIndex((p) => p.id == postId);
          user.liked.splice(postIndex, 1);
          post.likes -= 1;
          post.dislikes += 1;
        } else {
          // console.log("else block");
          user.disliked.push({
            postId,
          });
          post.dislikes += 1;
          await post.save();
          await user.save();
        }
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
