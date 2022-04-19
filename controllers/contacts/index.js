const { HTTP_STATUS_CODE } = require("../../libs/constants");
const ContactsService = require("../../services/contacts");

const listContacts = async (req, res, next) => {
  const contacts = await ContactsService.getAll(req.query, req.user);
  res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { ...contacts },
  });
};

const getContactById = async (req, res) => {
  const contact = await ContactsService.getById(req.params.contactId, req.user);

  return res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { contact },
  });
};

const addContact = async (req, res) => {
  const contact = await ContactsService.create(req.body, req.user);

  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: HTTP_STATUS_CODE.CREATED,
    payload: { contact },
  });
};

const removeContact = async (req, res) => {
  const contact = await ContactsService.remove(req.params.contactId, req.user);

  return res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { contact },
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const contact = await ContactsService.update(
    req.params.contactId,
    req.body,
    req.user
  );
  return res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { contact },
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
};
