function isStrongPassword(password) {
  return /[!@#$%^&*]/.test(password) && /\d/.test(password) && password.length >= 8;
}

module.exports = { isStrongPassword };
