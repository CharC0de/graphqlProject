import mongoose, { Schema } from "mongoose";

/*
type  Game {
    _id:ID!
    title:String!
    platform: [String!]!
}
*/

const GameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("games", GameSchema);
