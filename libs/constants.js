const LIMIT_NAME_LENGTH = {
  min: 1,
  max: 50,
};

const LIMIT_EMAIL_LENGTH = {
  min: 5,
  max: 50,
};

const LIMIT_PHONE_LENGTH = {
  min: 7,
  max: 30,
};

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
};

const Role = {
  ADMIN: "admin",
  USER: "user",
};

module.exports = {
  LIMIT_NAME_LENGTH,
  LIMIT_EMAIL_LENGTH,
  LIMIT_PHONE_LENGTH,
  HTTP_STATUS_CODE,
  Role,
};
