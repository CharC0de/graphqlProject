import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/graphSchema.js";
import mongoose from "mongoose";
import GameSchema from "./schema/mongoSchema/game.js";
import ReviewSchema from "./schema/mongoSchema/review.js";
import AuthorSchema from "./schema/mongoSchema/author.js";
import UserSchema from "./schema/mongoSchema/user.js";
import { isValidObjectId } from "mongoose";

const resolvers = {
  Query: {
    authors: async () => await AuthorSchema.find({}),
    games: async () => await GameSchema.find({}),
    reviews: async () => await ReviewSchema.find({}),
    users: async () => await UserSchema.find({}),

    author: async (_, args) => await AuthorSchema.findById(args.id),
    game: async (_, args) => await GameSchema.findById(args.id),
    review: async (_, args) => await ReviewSchema.findById(args.id),
    user: async (_, args) => await UserSchema.findById(args.id),
  },
  Mutation: {
    addGame: async (_, args) => {
      const result = await GameSchema.create(args.game);
      return result;
    },
    addAuthor: async (_, args) => {
      const result = await AuthorSchema.create(args.author);
      return result;
    },
    addReview: async (_, args) => {
      const { review } = args;

      // Ensure that both author_id and game_id are valid
      const isValidAuthorId = isValidObjectId(review.author_id);
      const isValidGameId = isValidObjectId(review.game_id);

      if (isValidAuthorId && isValidGameId) {
        // Check if the author and game exist in their respective schemas
        const authorExists = await AuthorSchema.exists({
          _id: review.author_id,
        });
        const gameExists = await GameSchema.exists({ _id: review.game_id });

        if (authorExists && gameExists) {
          // Both author and game exist, proceed to create the review
          const result = await ReviewSchema.create(review);
          return result;
        }
      }

      // If either author or game doesn't exist or IDs are invalid, return an error message
      return { ...review };
    },
    addUser: async (_, args) => {
      const result = await UserSchema.create(args.user);
      return result;
    },
    deleteGame: async (_, args) => {
      await GameSchema.findByIdAndDelete(args.id);
      return await GameSchema.find({});
    },
    deleteReview: async (_, args) => {
      await ReviewSchema.findByIdAndDelete(args.id);
      return await ReviewSchema.find({});
    },
    deleteAuthor: async (_, args) => {
      await AuthorSchema.findByIdAndDelete(args.id);
      return await AuthorSchema.find({});
    },
    deleteUser: async (_, args) => {
      await UserSchema.findByIdAndDelete(args.id);
      return await UserSchema.find({});
    },

    updateGame: async (_, args) =>
      await GameSchema.findByIdAndUpdate(args.id, args.game, { new: true }),

    updateReview: async (_, args) =>
      await ReviewSchema.findByIdAndUpdate(args.id, args.review, { new: true }),

    updateAuthor: async (_, args) =>
      await AuthorSchema.findByIdAndUpdate(args.id, args.author, { new: true }),

    updateUser: async (_, args) =>
      await UserSchema.findByIdAndUpdate(args.id, args.user, { new: true }),
  },
  Game: {
    reviews: async (parent) => await ReviewSchema.find({ game_id: parent._id }),
  },
  Author: {
    reviews: async (parent) =>
      await ReviewSchema.find({ author_id: Object(parent._id) }),
  },
  Review: {
    author: async (parent) => await AuthorSchema.findById(parent.author_id),
    game: async (parent) => await GameSchema.findById(parent.game_id),
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
try {
  await mongoose.connect("mongodb://localhost:27017/admin");
  console.log("db connection successful");
} catch (error) {
  console.log("db connection error:", error);
}

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log("server ready at", 4000, url);
