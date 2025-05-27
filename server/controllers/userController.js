const User = require("../models/User");
const bcrypt = require("bcrypt");
const Location = require("../models/Location");

// ✅ Check username availability
exports.checkUsernameAvailability = async (req, res) => {
  const user = await User.findOne({ username: req.query.username });
  res.json({ available: !user });
};

// ✅ Register or Update User
// exports.saveUser = async (req, res) => {
//   try {
//     const { username, newPassword, currentPassword, ...rest } = req.body;
//     let existingUser = await User.findOne({ username });
//     console.log("⏺ Form data received:", req.body);
//     if (existingUser && (!currentPassword || !(await bcrypt.compare(currentPassword, existingUser.password)))) {
//       return res.status(400).json({ error: "Current password is incorrect" });
//     }

//     const password = newPassword ? await bcrypt.hash(newPassword, 10) : existingUser.password;

//     const updatedData = {
//       ...rest,
//       username,
//       password,
//       profilePhoto: req.file ? req.file.path : existingUser?.profilePhoto
//     };

//     const user = existingUser
//       ? await User.findByIdAndUpdate(existingUser._id, updatedData, { new: true })
//       : await User.create(updatedData);

//     res.json({ message: "User saved successfully", user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.saveUser = async (req, res) => {
  try {
    const { username, newPassword, currentPassword, ...rest } = req.body;
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!username) return res.status(400).json({ error: "Username is required" });

    let existingUser = await User.findOne({ username });

    if (existingUser && (!currentPassword || !(await bcrypt.compare(currentPassword, existingUser.password)))) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const password = newPassword
      ? await bcrypt.hash(newPassword, 10)
      : existingUser?.password;

    const updatedData = {
      ...rest,
      username,
      password,
      profilePhoto: req.file ? req.file.path : existingUser?.profilePhoto,
    };

    const user = existingUser
      ? await User.findByIdAndUpdate(existingUser._id, updatedData, { new: true })
      : await User.create(updatedData);

    res.json({ message: "User saved successfully", user });
  } catch (error) {
    console.error("❌ Save user error:", error);
    res.status(500).json({ error: error.message });
  }
};



// ✅ Load location data from DB
exports.getCountries = async (req, res) => {
  const countries = await Location.find();
  res.json(countries.map(c => c.country));
};

// exports.getStates = async (req, res) => {
//   const { country } = req.params;
//   const countryData = await Location.findOne({ country });
//   res.json(countryData?.states.map(s => s.name));
// };

// exports.getCities = async (req, res) => {
//   const { country, state } = req.params;
//   const countryData = await Location.findOne({ country });
//   const stateData = countryData?.states.find(s => s.name === state);
//   res.json(stateData?.cities || []);
// };
// controllers/userController.js (or locationController.js)

exports.getStates = async (req, res) => {
  const { country } = req.params;
  const countryData = await Location.findOne({ country });

  // Return full states array including _id, name, cities
  if (!countryData) return res.status(404).json({ error: "Country not found" });
  res.json(countryData.states);  // [{ _id, name, cities: [] }, ...]
};

exports.getCities = async (req, res) => {
  const { country, state } = req.params;
  const countryData = await Location.findOne({ country });
  if (!countryData) return res.status(404).json({ error: "Country not found" });

  const stateData = countryData.states.find(s => s._id.toString() === state);
  if (!stateData) return res.status(404).json({ error: "State not found" });

  res.json(stateData.cities || []);
};

