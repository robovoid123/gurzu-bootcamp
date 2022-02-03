const router = require("express").Router();

const userController = require("../controllers/user.controller");

router.get("/:id", userController.get);
router.post("", userController.add);
router.get("", userController.getAll);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = { userRouter: router };
