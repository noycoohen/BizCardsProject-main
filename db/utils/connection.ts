import chalk from "chalk";
import mongoose from "mongoose";

export const connect = async () => {
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const database = process.env.DATABASE_NAME;
  //const user = process.env.DATABASE_USER;
  //const pass = process.env.DATABASE_PASSWORD;

  const connectionString = `mongodb://${host}:${port}/${database}`;

  console.log(chalk.blueBright.bgWhiteBright(connectionString));
  //const connectionString = `mongodb://user:password@host:port/database`;

  await mongoose.connect(connectionString);

  console.log(chalk.blueBright.bold("Database Connected"));
};
