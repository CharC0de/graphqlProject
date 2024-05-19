import mongoose, { Schema } from "mongoose";

/*
type Review {
    _id: ID!
    rating: Int!
    content: String!
}
*/

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  game_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("reviews", ReviewSchema);
