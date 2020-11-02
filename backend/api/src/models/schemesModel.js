const mongoose = require("mongoose");
const slugify = require("slugify");
const schemeSchema = new mongoose.Schema(
  {
    schemeName: {
      required: [true, "Scheme Name cannot be empty"],
      type: String,
      unique: true,
      trim: true,
      maxlength: [200, "Scheme Name cannot be more than 200 characters"],
    },
    slug: String,
    description: {
      required: [true, "Scheme Description cannot be empty"],
      type: String,
      maxlength: [
        1000,
        "Scheme Description cannot be more than 1000 characters",
      ],
    },
    detailedDescription: String,
    relatedWebsite: {
      type: String,
      // match: [
      //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      //   "Please enter valid website link with http or https",
      // ],
    },
    additionalWebsites: String,

    emailSupport: {
      type: String,
    },
    statesImplementedIn: {
      String,
    },
    location: {
      //GeoJson point
      type: {
        type: String,
        enum: ["Point"],
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
        index: "2dsphere",
      },
      formattedAddress: String,
      formattedStreet: String,
      formattedCity: String,
      formattedState: String,
      formattedZipcode: String,
      formattedCountry: String,
    },
    schemeType: {
      type: String,
      required: true,
      // enum: ["Government", "Semi-Government"],
    },
    averageRating: {
      type: String,
      min: [1, "Rating should be atleast 1"],
      max: [10, "Rating cannot be greater than 10"],
    },
    relatedImage: {
      type: String,
      default: "default-photo.png",
    },
    addedOn: {
      type: Date,
      default: Date.now(),
    },
    addedByUserId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    addedByUserName: {
      type: String,
    },
    modifiedOn: {
      type: Date,
      default: Date.now(),
    },
    modifiedBy: {
      type: String,
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
    status: {
      type: Number,
    },
  },
  { collection: "schemes" }
);

module.exports = mongoose.model("schemes", schemeSchema);

//Create scheme slugs from the scheme name
schemeSchema.pre("save", function () {
  console.log("slugify" + this.schemeName);
  this.slug = slugify(this.schemeName, { lower: true });
  next();
});
