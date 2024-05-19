import mongoose, { Schema } from "mongoose";

/*
type Author{
    id: ID!
    name: String!
    verified: Boolean!
}
*/

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("authors", AuthorSchema);
