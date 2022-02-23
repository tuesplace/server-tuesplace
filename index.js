const express = require("express");
const mongoose = require("mongoose");
const { authRouter, profileRouter, postRouter, groupRouter, commentRouter } = require("./routes");
const cors = require("cors");
const {
  errorHandler,
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyPostExists,
} = require("./middleware");
require("dotenv/config");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/group", groupRouter);
app.use("/api/group/:groupId/post", verifyToken, verifyGroupExists, verifyInGroup, postRouter);
app.use(
  "/api/group/:groupId/post/:postId/comment",
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyPostExists,
  commentRouter
);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 8888;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
