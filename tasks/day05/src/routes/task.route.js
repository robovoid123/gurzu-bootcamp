const router = require("express").Router();
const { validate } = require("../middlewares/validate");
const {
  addTaskValidator,
  updateTaskValidator,
  userTaskAssignUnassignValidator,
} = require("../middlewares/validate/validators/task.validator");

const taskController = require("../controllers/task.controller");
const userTaskController = require("../controllers/userTask.controller");

router.get("/:id", taskController.get);
router.post("", validate(addTaskValidator()), taskController.add);
router.get("", taskController.getAll);
router.put("/:id", validate(updateTaskValidator()), taskController.update);
router.delete("/:id", taskController.remove);
router.post(
  "/assign",
  validate(userTaskAssignUnassignValidator()),
  userTaskController.assignToUser
);
router.post(
  "/unassign",
  validate(userTaskAssignUnassignValidator()),
  userTaskController.unassignToUser
);
router.get("/users/:id", userTaskController.getAllByUser);

module.exports = { taskRouter: router };
