import path from "path";
import sao from "sao";

const generator = path.resolve(__dirname, "..", "lib");

describe("create-ts-app", () => {
  test.each<[string]>([
    ["README.md"],
    ["LICENSE"],
    ["package.json"],
    ["yarn.lock"],
    ["tsconfig.json"],
    ["webpack.config.js"],
    ["src/index.html"],
    ["src/index.tsx"],
    [".gitignore"],
    [".eslintignore"],
    [".eslintrc.js"],
    [".prettierrc.js"],
  ])("it should include %s", async (filename) => {
    const mockPromptAnswers = {
      appType: "frontend",
      features: ["eslint", "prettier"],
      name: "test-app",
      license: "MIT",
    };
    const stream = await sao.mock({ generator }, mockPromptAnswers);
    expect(stream.fileList).toContain(filename);
  });

  describe("appType is frontend", () => {
    describe("ESLint is not selected", () => {
      test.each<[string]>([[".eslintignore"], [".eslintrc.js"]])(
        "it should not include %s",
        async (filename) => {
          const mockPromptAnswers = {
            appType: "frontend",
            features: ["prettier"],
            name: "test-app",
            license: "MIT",
          };
          const stream = await sao.mock({ generator }, mockPromptAnswers);
          expect(stream.fileList).not.toContain(filename);
        }
      );
    });

    describe("ESLint and Prettier are not selected", () => {
      test.each<[string]>([
        [".eslintignore"],
        [".eslintrc.js"],
        [".prettierrc.js"],
      ])("it should not include %s", async (filename) => {
        const mockPromptAnswers = {
          appType: "frontend",
          features: [],
          name: "test-app",
          license: "MIT",
        };
        const stream = await sao.mock({ generator }, mockPromptAnswers);
        expect(stream.fileList).not.toContain(filename);
      });
    });
  });
});
