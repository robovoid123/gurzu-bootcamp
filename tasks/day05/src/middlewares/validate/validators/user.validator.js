const { check } = require("express-validator");

const addUserValidator = () => {
  return [
    check("name").not().isEmpty().trim().withMessage("Name is required"),
    check("email").trim().isEmail().withMessage("Valid email is required"),
    check("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password is required and must be at least 6 characters"),
    check("address").trim().isString(),
  ];
};

const updateUserValidator = () => {
  return [
    check("name")
      .trim()
      .optional() //can be skipped
      .notEmpty() //but cannot be empty
      .withMessage("Name cannot be empty and is required"),
    check("email")
      .isEmail()
      .optional()
      .withMessage("Email cannot be empty and valid email is required"),
    check("password")
      .trim()
      .optional()
      .isLength({ min: 6 })
      .withMessage(
        "Password cannot be empty and must be at least 6 characters"
      ),
    check("address")
      .trim()
      .optional()
      .notEmpty()
      .withMessage("Address cannot be empty and is required"),
  ];
};

module.exports = { addUserValidator, updateUserValidator };
