import { env } from "./env.js";
import { buildApp } from "./setup.js";

const port = env.PORT;

const startServer = async () => {
  const app = await buildApp();
  app.listen({ port, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening on ${address}`);
  });
};

startServer();
