const mongoose = require("mongoose");
const slugify = require("slugify");
const userTypeSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "userType Name cannot be empty"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "userType Name cannot be more than 200 characters"],
    },
    gender: {
      type: String
    },
    isChild: {
      type: Boolean
    },
    isHandicapped: {
      type: Boolean
    },
    isWidowed: {
      type: Boolean
    },
    isPoor: {
      type: Boolean
    },
    isSC: {
      type: Boolean
    },
    isST: {
      type: Boolean
    },
    isOBC: {
      type: Boolean
    },
    isGovtEmployee: {
      type: Boolean
    },
    isUnEmployed: {
      type: Boolean
    },
    isOld: {
      type: Boolean
    },
    commonName: {
      required: [true, "state Common Name cannot be empty"],
      type: String,
      trim: true,
      maxlength: [200, "state Common Name cannot be more than 200 characters"],
    },
    alternateName: {
      required: [true, "state alternate Name cannot be empty"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "state alternate Name cannot be more than 200 characters"],
    },
    slug: String,
    description: {
      required: [true, "userType Description cannot be empty"],
      type: String,
      maxlength: [
        1000,
        "userType Description cannot be more than 1000 characters",
      ],
    },
    detailedDescription: String,
    relatedImage: {
      type: String,
      default: "default-photo.png",
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
  { collection: "userType" }
);

module.exports = mongoose.model("userType", userTypeSchema);