const mongoose = require("mongoose");
const slugify = require("slugify");
const updateLogSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "Name cannot be empty"],
      type: String,
      trim: true,
      maxlength: [200, "Name cannot be more than 200 characters"],
    },
    description: {
      type: String,
      maxlength: [
        200,
        "state Description cannot be more than 200 characters",
      ],
    },
    addedOn: {
      type: Date,
      default: Date.now(),
    },
    addedBy: {
      type: mongoose.Schema.ObjectId
    },
    timeLog: {
      type: String,
    },
  },
  { collection: "updateLog" }
);

module.exports = mongoose.model("updateLog", updateLogSchema);
