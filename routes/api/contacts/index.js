const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../../controllers/contacts");
const {
  schemaCreateContact,
  schemaMongoId,
} = require("./contacts-validation-schemes");
const {
  validateBody,
  validateParams,
} = require("../../../middlewares/validation");

const guard = require("../../../middlewares/guard");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const router = express.Router();

router.get("/", guard, listContacts);

router.get("/:contactId", guard, wrapperError(getContactById));

router.post(
  "/",
  guard,
  validateBody(schemaCreateContact),
  wrapperError(addContact)
);

router.delete(
  "/:contactId",
  guard,
  validateParams(schemaMongoId),
  wrapperError(removeContact)
);

router.put(
  "/:contactId",
  guard,
  validateParams(schemaMongoId),
  wrapperError(updateContact)
);

router.patch(
  "/:contactId/phone",
  guard,
  validateParams(schemaMongoId),
  wrapperError(updateContact)
);

module.exports = router;
