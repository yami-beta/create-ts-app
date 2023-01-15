import path from "path";
import { Logger } from "hygen";
import { Prompter } from "hygen/dist/types";
import { run } from ".";

describe("create-ts-app", () => {
  const outputBasePath = process.env.TEST_OUTPUT_BASE_PATH
    ? path.resolve(process.env.TEST_OUTPUT_BASE_PATH)
    : path.resolve(__dirname, "..", "tmp");

  describe("next app", () => {
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
      const result = await run(["next", "app"], {
        cwd: path.resolve(outputBasePath, "next", "app"),
        createPrompter: () => prompter,
        logger: new Logger(() => {}),
      });

      expect(result.success).toBe(true);

      // check added
      [
        ".eslintrc.js",
        ".gitignore",
        ".prettierrc.js",
        ".prettierignore",
        "package.json",
        "src/pages/index.tsx",
        "README.md",
        "tsconfig.json",
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
