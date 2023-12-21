// the config function from the dotenv module:
import { config } from "dotenv";

export const configEnv = () => {
  const env = process.env.NODE_ENV || "dev";

  config({
    path: `environments/.${env}.env`,
  });
};
