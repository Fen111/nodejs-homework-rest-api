const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const {
  schemaCreateContact,
  schemaMongoId,
} = require("./contacts-validation-schemes");
const {
  validateBody,
  validateParams,
} = require("../../middlewares/validation");
const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schemaCreateContact), addContact);

router.delete("/:contactId", validateParams(schemaMongoId), removeContact);

router.put("/:contactId", validateParams(schemaMongoId), updateContact);

router.patch("/:contactId/phone", validateParams(schemaMongoId), updateContact);

module.exports = router;
