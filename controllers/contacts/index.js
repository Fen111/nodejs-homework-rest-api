const contactRepository = require("../../repository/contacts");
const { HTTP_STATUS_CODE } = require("../../libs/constants");

const listContacts = async (req, res, next) => {
  const contacts = await contactRepository.listContacts();
  res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    payload: { contacts },
  });
};

const getContactById = async (req, res, next) => {
  const contact = await contactRepository.getContactById(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: HTTP_STATUS_CODE.OK,
      payload: { contact },
    });
  }
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
    status: "error",
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: "Not Found",
  });
};

const addContact = async (req, res, next) => {
  if (req.body) {
    const contacts = await contactRepository.addContact(req.body);
    res.status(HTTP_STATUS_CODE.CREATED).json({
      status: "success",
      code: HTTP_STATUS_CODE.CREATED,
      payload: { contacts },
    });
  }
  return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
    status: "error",
    code: HTTP_STATUS_CODE.BAD_REQUEST,
    message: "missing required name field",
  });
};

const removeContact = async (req, res, next) => {
  const contact = await contactRepository.removeContact(req.params.contactId);
  if (contact) {
    res.json({
      status: "success",
      code: HTTP_STATUS_CODE.OK,
      payload: { contact },
      message: "contact deleted",
    });
  }
  return res.status_(HTTP_STATUS_CODE.NOT_FOUND).json({
    status: "error",
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: "Not Found",
  });
};

const updateContact = async (req, res, next) => {
  if (req.body) {
    const contact = await contactRepository.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      res.json({
        status: "success",
        code: HTTP_STATUS_CODE.OK,
        payload: { contact },
      });
    }
    return res.status(404).json({
      status: "error",
      code: HTTP_STATUS_CODE.NOT_FOUND,
      message: "Not Found",
    });
  }
  return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
    status: "error",
    code: HTTP_STATUS_CODE.BAD_REQUEST,
    message: "missing fields",
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
};
