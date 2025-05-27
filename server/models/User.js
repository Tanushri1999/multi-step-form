const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profilePhoto: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profession: { type: String, enum: ["Student", "Developer", "Entrepreneur"] },
  companyName: { type: String },
  addressLine1: { type: String, required: true },
  country: String,
  state: String,
  city: String,
  subscriptionPlan: { type: String, enum: ["Basic", "Pro", "Enterprise"] },
  newsletter: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
