const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client also delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete the refresh token in the db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken,
  );
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
