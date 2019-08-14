import path from "path";
import sao from "sao";

const generator = path.resolve(__dirname, "..", "lib");

describe("create-ts-app", () => {
  test.each<[string]>([["README.md"], ["package.json"]])(
    "it should include %s",
    async filename => {
      const mockPromptAnswers = { name: "test-app" };
      const stream = await sao.mock({ generator }, mockPromptAnswers);
      expect(stream.fileList).toContain("README.md");
    }
  );
});
