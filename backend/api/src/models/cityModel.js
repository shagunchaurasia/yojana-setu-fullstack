const mongoose = require("mongoose");
const slugify = require("slugify");
const citySchema = new mongoose.Schema(
  {
    name: {
      required: [true, "city Name cannot be empty"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "city Name cannot be more than 200 characters"],
    },
    stateId: {
      required: [true, "StateId of the city cannot be empty"],
      type: String,
      trim: true,
      maxlength: [200, "StateId of the city cannot be more than 200 characters"],
    },
    commonName: {
      required: [true, "city Common Name cannot be empty"],
      type: String,
      trim: true,
      maxlength: [200, "city Common Name cannot be more than 200 characters"],
    },
    alternateName: {
      required: [true, "city alternate Name cannot be empty"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "city alternate Name cannot be more than 200 characters"],
    },
    urlSlug: String,
    description: {
      required: [true, "city Description cannot be empty"],
      type: String,
      maxlength: [
        1000,
        "city Description cannot be more than 1000 characters",
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
  { collection: "city" }
);

module.exports = mongoose.model("city", citySchema);

//Create city slugs from the city name
citySchema.pre("save", function () {
  console.log("slugify" + this.cityName);
  this.slug = slugify(this.cityName, { lower: true });
  next();
});
