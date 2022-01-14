import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: {
    type: String,
    default: "Terry Dias",
  },
  username: {
    type: String,
    default: "terry_dias",
  },
  grossCoins: {
    type: Number,
    default: 2100,
  },
  leadCoins: {
    type: Number,
    default: 1100,
  },
  createdAt: {
    type: Date,
    default: Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
