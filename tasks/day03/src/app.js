const express = require("express");
const dotenv = require("dotenv").config();

const { userRouter } = require("./routes/user.route");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
