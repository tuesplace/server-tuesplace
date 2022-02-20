const RefreshTokenFamily = require("../models/RefreshTokenFamily");

module.exports = async (req, _, next) => {
  try {
    const refreshTokenFamily = await RefreshTokenFamily.findById(
      req.auth.refreshTokenFamilyId
    );
    const utcMilllisecondsSinceEpoch = Date.now();
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);

    const tokenAgeInMinutes =
      (utcSecondsSinceEpoch - Date.parse(refreshTokenFamily.createdAt) / 1000) /
      60;
    console.log(tokenAgeInMinutes);
    if (tokenAgeInMinutes > 20) {
      refreshTokenFamily.deleteOne();
      throw {
        token:
          "Трябва да потвърдим Вашата самоличност. Излезте и влезте обратно в профила си",
        status: 401,
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};
