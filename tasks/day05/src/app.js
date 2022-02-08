const express = require("express");
const _ = require("dotenv").config();

const { userRouter } = require("./routes/user.route");
const { taskRouter } = require("./routes/task.route");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
