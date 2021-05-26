const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateLoginInput,
  validateRegisterInput,
} = require("../../util/validators");
const { SECRET_CODE } = require("../../config");
const User = require("../../models/User"); // Mongoose Model

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_CODE,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }, context, info) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Incorrect Password";
        throw new UserInputError("Incorrect Password", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // register(_, args, context, info) {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //Make sure user unique
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      //Hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        pfp: "https://semantic-ui.com/images/avatar2/large/matthew.png",
        bio: "I need to make a new bio!",
        email,
        liked: [],
        disliked: [],
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save(); // newUser is a mongoose model ".save()" is a method https://mongoosejs.com/docs/models.html

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async changeBio(_, { username, body }, context) {
      if (body.length > 144) {
        throw new UserInputError("Bio must be under 144 characters.");
      }
      const user = await User.findOne({ username });
      user.bio = body;
      await user.save();
      return user;
    },

    async changePicture(_, { username, link }, context) {
      const regEx =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      if (!link.match(regEx)) {
        throw new UserInputError("Link must be a valid https website");
      }
      const user = await User.findOne({ username });
      user.pfp = link;
      await user.save();
      return user;
    },
  },
};
