const { isStrongPassword } = require("../utils/passwordUtils");

function validateUser(req, res, next) {
  const { username, newPassword, profession, companyName } = req.body;

  if (!username || username.length < 4 || username.length > 20 || /\s/.test(username)) {
    return res.status(400).json({ error: "Invalid username" });
  }

  if (newPassword && !isStrongPassword(newPassword)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  if (profession === "Entrepreneur" && !companyName) {
    return res.status(400).json({ error: "Company name is required for entrepreneurs" });
  }

  next();
}

module.exports = validateUser;
