const authService = require("../../services/auth");
const { HTTP_STATUS_CODE } = require("../../libs/constants");

const registration = async (req, res) => {
  const user = await authService.create(req.body);
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    data: { ...user },
  });
};
const login = async (req, res) => {
  const token = await authService.login(req.body);
  console.log(token);
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: { token },
  });
};
const logout = async (req, res) => {
  await authService.logout(req.user.id);
  return res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = { registration, login, logout, getCurrent };
