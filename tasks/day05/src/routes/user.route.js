const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const {
  addUserValidator,
  updateUserValidator,
} = require("../middlewares/validate/validators/user.validator");

const userController = require("../controllers/user.controller");

router.get("/:id", userController.get);
router.post("", validate(addUserValidator()), userController.add);
router.get("", userController.getAll);
router.put("/:id", validate(updateUserValidator()), userController.update);
router.delete("/:id", userController.remove);

module.exports = { userRouter: router };
