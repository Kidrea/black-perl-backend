import logger from "pino";
import dayjs from "dayjs";

// Formato de salida en consola
const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
