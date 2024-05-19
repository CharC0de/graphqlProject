import mongoose, { Schema } from "mongoose";

/*
type User {
    username: String!
    age: Int!
    email: String!
    address:String!

}
*/

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
