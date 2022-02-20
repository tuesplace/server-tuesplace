const jwt = require("jsonwebtoken");
const RefreshTokenFamily = require("../models/RefreshTokenFamily");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw { token: "No token provided", status: 400 };
    }
    const token = authHeader.split("Bearer ")[1];

    req.auth = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const refreshTokenFamily = await RefreshTokenFamily.findById(
      req.auth.refreshTokenFamilyId
    );
    if (
      !refreshTokenFamily ||
      refreshTokenFamily.redundantTokens.includes(req.auth.refreshTokenId)
    ) {
      throw {
        tokenPair: "Access token points to invalid refresh token",
        status: 400,
      };
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).send({
        sucess: false,
        errors: {
          token: "Автентификационния тоукън e изтекъл. Презаредете страницата.",
        },
      });
      return;
    }

    next(err);
  }
};
