import path from "path";

const config: any = {
  templateDir: path.resolve(__dirname, "..", "template"),
  prompts() {
    return [
      {
        name: "name",
        message: "What is the name of the new project",
        default: this.outFolder,
        filter: (val: string) => val.toLowerCase()
      }
    ];
  },
  actions() {
    const { answers } = this;
    return [
      {
        type: "add",
        files: "**"
      },
      {
        type: "modify",
        files: "package.json",
        handler(data: any, filepath: string) {
          return {
            name: answers.name
          };
        }
      }
    ];
  },
  async completed() {
    this.gitInit();
    await this.npmInstall();
  }
};

export = config;
