const { AuthenticationError, UserInputError } = require("apollo-server");
const { argsToArgsConfig } = require("graphql/type/definition");

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
      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

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
      post = await Post.findById(postId);
      if (post) {
        if (user.liked.find((id) => id === postId)) {
        } else if (user.disliked.find((id) => id === postId)) {
          const postIndex = user.disliked.findIndex((id) => id == postId);
          user.disliked.splice(postIndex, 1);
          post.likes += 1;
          post.dislikes -= 1;
        } else {
          user.liked.push(postId);
          post.likes += 1;
        }
        await post.save();
        await user.save();
        return post;
      } else throw new UserInputError("Post not found");
    },

    async dislikePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      post = await Post.findById(postId);
      if (post) {
        if (user.disliked.find((id) => id === postId)) {
        } else if (user.liked.find((id) => id === postId)) {
          const postIndex = user.liked.findIndex((id) => id == postId);
          user.liked.splice(postIndex, 1);
          post.likes -= 1;
          post.dislikes += 1;
        } else {
          user.disliked.push(postId);
          post.dislikes += 1;
        }
        await post.save();
        await user.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
