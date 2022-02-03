const express = require("express");

const { userRouter } = require("./routes/user.route");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
