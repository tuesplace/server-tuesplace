const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const {
  authRouter,
  profileRouter,
  postRouter,
  groupRouter,
  commentRouter,
  markRouter,
} = require("./routes");
const {
  errorHandler,
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyPostExists,
  resSender,
  verifyGroupRedactor,
} = require("./middleware");
const swaggerDoc = require("./swaggerDoc");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(resSender);
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
app.use(
  "/api/group/:groupId/mark",
  verifyToken,
  verifyGroupExists,
  verifyInGroup,
  verifyGroupRedactor,
  markRouter
);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    customSiteTitle: "tuesplace API Docs",
    customfavIcon: "/favicon.ico",
  })
);
app.use(errorHandler);

app.use(express.static("./assets"));

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
