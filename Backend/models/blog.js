const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: String,
  content: String,
  type: String,
  stage: {
    type: Number, // 0: New, 1: In Prog, 2: Comp
    default: 0,
  },
  reference: String, // a link
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
