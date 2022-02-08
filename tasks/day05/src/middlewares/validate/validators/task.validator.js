const { check } = require("express-validator");

const addTaskValidator = () => {
  return [
    check("title").not().isEmpty().trim().withMessage("Name is required"),
    check("detail").optional().trim().isString(),
  ];
};

const userTaskAssignUnassignValidator = () => {
  return [
    check("user_id")
      .not()
      .isEmpty()
      .trim()
      .isNumeric()
      .withMessage("User ID is required"),
    check("task_id")
      .not()
      .isEmpty()
      .trim()
      .isNumeric()
      .withMessage("Task ID is required"),
  ];
};

const updateTaskValidator = () => {
  return [
    check("title")
      .trim()
      .optional() //can be skipped
      .notEmpty() //but cannot be empty
      .withMessage("Title cannot be empty and is required"),
    check("detail").trim().optional(), //can be skipped
  ];
};

module.exports = {
  addTaskValidator,
  updateTaskValidator,
  userTaskAssignUnassignValidator,
};
