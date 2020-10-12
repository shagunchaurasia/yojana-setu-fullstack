const mongoose = require("mongoose");
const slugify = require("slugify");
const stateSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "state Name cannot be empty"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "state Name cannot be more than 200 characters"],
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
    urlSlug: String,
    description: {
      required: [true, "state Description cannot be empty"],
      type: String,
      maxlength: [
        1000,
        "state Description cannot be more than 1000 characters",
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
    reviewer: {
      type: mongoose.Schema.ObjectId
    },
    reviewState: {
      type: String,
      enum : ['UnAssigned','Pending','Approved','Rejected'],
      default: 'user'
    },
    reviewNotes: {
      type: String
    },
  },
  { collection: "state" }
);

module.exports = mongoose.model("state", stateSchema);

//Create state slugs from the state name
stateSchema.pre("save", function () {
  console.log("slugify" + this.stateName);
  this.slug = slugify(this.stateName, { lower: true });
  next();
});
