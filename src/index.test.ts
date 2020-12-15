import path from "path";
import { Logger } from "hygen";
import { Prompter } from "hygen/dist/types";
import { run } from ".";

describe("create-ts-app", () => {
  describe("react spa", () => {
    test("add and inject", async () => {
      const prompter: Prompter<{}, any> = {
        prompt: () => {
          return Promise.resolve({
            name: "test-app",
            version: "0.0.0",
            author: "test-author",
            license: "UNLICENSED",
            overwrite: true,
          });
        },
      };
      const result = await run(["react", "spa"], {
        cwd: path.join(__dirname, "..", "tmp", "react", "spa"),
        createPrompter: () => prompter,
        logger: new Logger(() => {}),
      });

      expect(result.success).toBe(true);

      // check added
      [
        ".eslintrc.js",
        ".gitignore",
        ".prettierrc.js",
        "package.json",
        "src/index.html",
        "src/index.tsx",
        "README.md",
        "tsconfig.json",
        "webpack.config.js",
        "yarn.lock",
      ].forEach((filepath) => {
        expect(result.actions).toContainEqual(
          expect.objectContaining({
            type: "add",
            subject: filepath,
            status: "added",
          })
        );
      });

      // check injected
      expect(result.actions).toContainEqual(
        expect.objectContaining({
          type: "inject",
          subject: "package.json",
          status: "inject",
        })
      );
    });
  });
});
