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
          return post;
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
        if (post.likes.find((vote) => vote.username === username)) {
        } else if (post.dislikes.find((vote) => vote.username === username)) {
          user.disliked = user.disliked.filter(
            (post) => post.id !== postId
          ); /* Remove frm User Dislikes */
          user.liked.push(postId); /* Add to User Likes */
          post.dislikes = post.dislikes.filter(
            (vote) => vote.username !== username
          ); /* Remove from Post Dislikes */
          post.likes.push({ username }); /* Add to Post Likes */
        } else {
          user.liked.push(postId);
          post.likes.push({ username });
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
        if (post.dislikes.find((vote) => vote.username === username)) {
        } else if (post.likes.find((vote) => vote.username === username)) {
          user.liked = user.liked.filter(
            (post) => post.id !== postId
          ); /* Remove from User Likes */
          user.disliked.push(postId); /* Add to User Dislikes*/

          post.likes = post.likes.filter(
            (vote) => vote.username !== username
          ); /* Remove from Post Likes */
          post.dislikes.push({ username }); /* Add to Post Dislikes */
        } else {
          user.disliked.push(postId);
          post.dislikes.push({ username });
        }
        await post.save();
        await user.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
