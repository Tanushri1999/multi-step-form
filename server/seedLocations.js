// seedLocations.js
const mongoose = require("mongoose");
const Location = require("./models/Location");
const data = require("./datalocation.json");

mongoose.connect("mongodb+srv://tanushri06rajput:PkbaaIusK2iYzvSb@cluster0.oo2oxvt.mongodb.net/updateform").then(async () => {
  await Location.deleteMany({});
  await Location.insertMany(data);
  console.log("Location data seeded");
  process.exit();
});
