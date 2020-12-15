import path from "path";
import { runner, Logger } from "hygen";
import { RunnerConfig } from "hygen/dist/types";

const templates = path.join(__dirname, "..", "templates");

export const run = (argv: string[], config: RunnerConfig = {}) => {
  return runner(argv, {
    templates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => require("enquirer"),
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      return require("execa").command(action, { ...opts, shell: true });
    },
    debug: !!process.env.DEBUG,
    ...config,
  });
};
