const mongoose = require("mongoose");

const schemeReviewSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "Please add a title for the review"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "Review Title cannot be more than 200 characters"],
    },
    reviewDescription: {
      required: [true, "Review Description cannot be empty"],
      type: String,
      trim: true,
    },
    reviewRating: {
      required: [true, "Please add a rating between 1 and 10 "],
      type: Number,
      min: 1,
      max: 10,
    },
    scheme: {
      type: mongoose.Schema.ObjectId,
      ref: "schemes",
      required: true,
    },
    addedOn: {
      type: Date,
      default: Date.now(),
    },
    addedBy: {
      type: String,
    },
    modifiedOn: {
      type: Date,
      default: Date.now(),
    },
    modifiedBy: {
      type: String,
    },
    status: {
      type: Number,
    },
  },
  { collection: "reviews" }
);

module.exports = mongoose.model("reviews", schemeReviewSchema);
