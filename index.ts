import express from "express";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { logger } from "./middleware/logger";
import { connect } from "./db/utils/connection";
import { errorHandler } from "./middleware/error-handler";
import { configEnv } from "./environments";
import cors from "cors";
import chalk from "chalk";
import path from "path";
import { initDatabase } from "./db/utils/initDataBase";

configEnv();

connect();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(logger);

// serve the static files in the public directory
app.use(express.static("public"));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

app.use(errorHandler);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notFound.html"));
});

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  initDatabase();
  console.log(chalk.yellow(`App is running on http://localhost:${PORT}`));
});
