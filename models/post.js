const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  photos: [{
    type: String,
    required: true,
  }],
  postedBy: {
    type: ObjectId,
    ref: "USER",
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,  // Assuming the amount is a numeric value
    required: true,
  },
});

module.exports = mongoose.model("POST", postSchema);
