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
const router = express.Router();

router.get("/", guard, listContacts);

router.get("/:contactId", guard, getContactById);

router.post("/", guard, validateBody(schemaCreateContact), addContact);

router.delete(
  "/:contactId",
  guard,
  validateParams(schemaMongoId),
  removeContact
);

router.put("/:contactId", guard, validateParams(schemaMongoId), updateContact);

router.patch(
  "/:contactId/phone",
  guard,
  validateParams(schemaMongoId),
  updateContact
);

module.exports = router;
