const express = require("express");
const contactModel = require("../../models/contacts");
const {
  schemaCreateContact,
  schemaMongoId,
} = require("./contacts-validation-schemes");
const {
  validateBody,
  validateParams,
} = require("../../middlewares/validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactModel.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  if (req.body) {
    const contacts = await contactModel.addContact(req.body);
    res
      .status(201)
      .json({ status: "success", code: 201, payload: { contacts } });
  }
  return res.status(400).json({
    status: "error",
    code: 400,
    message: "missing required name field",
  });
});

router.delete(
  "/:contactId",
  validateParams(schemaMongoId),
  async (req, res, next) => {
    const contact = await contactModel.removeContact(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        payload: { contact },
        message: "contact deleted",
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  }
);

router.put(
  "/:contactId",
  validateParams(schemaMongoId),
  async (req, res, next) => {
    if (req.body) {
      const contact = await contactModel.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        res.json({ status: "success", code: 200, payload: { contact } });
      }
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not Found" });
    }
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  }
);

router.patch(
  "/:contactId/phone",
  validateParams(schemaMongoId),
  async (req, res, next) => {
    const contact = await contactModel.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      res.json({ status: "success", code: 200, payload: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  }
);

module.exports = router;
