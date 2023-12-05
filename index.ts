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

configEnv(); //load all the values from .env

connect();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
//add an express middleware that uses JSON.parse(body)
app.use(express.json());
app.use(logger);

// serve the static files in the public directory
app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notFound.html"));
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);

app.use(errorHandler);

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
  console.log(chalk.yellow(`App is running on http://localhost:${PORT}`));
});
