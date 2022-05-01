const express = require("express");
const {
  registration,
  login,
  logout,
  verifyUser,
  reverifyEmail,
  getCurrent,
} = require("../../../controllers/auth");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const guard = require("../../../middlewares/guard");
const router = express.Router();
const limiter = require("../../../middlewares/rate-limit");

router.post(
  "/registration",
  limiter(15 * 60 * 1000 * 2),
  wrapperError(registration)
);
router.post("/login", wrapperError(login));
router.get("/verify-email/:token", wrapperError(verifyUser));
router.post("/verify-email", wrapperError(reverifyEmail));
router.post("/logout", guard, wrapperError(logout));

router.get("/current", wrapperError(getCurrent));

module.exports = router;
