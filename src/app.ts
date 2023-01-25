import express from "express";
import config from "config";
import log from "./logger";

const port = config.get("port") as number;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`Server listing on port ${port}`);
});
