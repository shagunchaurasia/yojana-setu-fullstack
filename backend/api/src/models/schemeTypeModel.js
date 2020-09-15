const mongoose = require("mongoose");
const slugify = require("slugify");
const schemeTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "SchemeType Name cannot be more than 200 characters"],
    },
    commonName: {
      type: String,
      trim: true,
      maxlength: [200, "SchemeType Common Name cannot be more than 200 characters"],
    },
    alternateName: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "SchemeType alternate Name cannot be more than 200 characters"],
    },
    isGovt: {
      type: Boolean,
      default: false
    },
    urlSlug: String,
    description: {
      required: [true, "SchemeType Description cannot be empty"],
      type: String,
      maxlength: [
        1000,
        "SchemeType Description cannot be more than 1000 characters",
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
  { collection: "schemeType" }
);

module.exports = mongoose.model("schemeType", schemeTypeSchema);
