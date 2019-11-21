import path from "path";

const config: any = {
  templateDir: path.resolve(__dirname, "..", "template", "base"),
  prompts() {
    return [
      {
        name: "appType",
        message: "Application type",
        type: "list",
        choices: ["frontend"]
      },
      {
        name: "features",
        message: "Features",
        type: "checkbox",
        choices: [
          {
            name: "ESLint",
            value: "eslint"
          },
          {
            name: "Prettier",
            value: "prettier"
          }
        ],
        default: ["eslint", "prettier"]
      },
      {
        name: "name",
        message: "Project name",
        default: this.outFolder,
        filter: (val: string) => val.toLowerCase()
      },
      {
        name: "version",
        message: "Version",
        default: "0.0.0"
      },
      {
        name: "author",
        message: "Author",
        default: () => {
          if (!this.gitUser.name && !this.gitUser.username) {
            return "";
          }

          let author = `${this.gitUser.name || this.gitUser.username}`;
          if (this.gitUser.email) {
            author = `${author} <${this.gitUser.email}>`;
          }

          return author;
        }
      },
      {
        name: "license",
        message: "License",
        type: "list",
        choices: ["UNLICENSED", "MIT"]
      },
      {
        name: "licenseOwner",
        message: "License owner",
        default: this.gitUser.name || this.gitUser.username,
        when: (answers: any) => answers.license === "MIT"
      }
    ];
  },
  actions() {
    const { answers } = this;
    return [
      {
        type: "add",
        files: "**",
        filters: {
          LICENSE_MIT: answers.license === "MIT"
        }
      },
      answers.appType === "frontend" && {
        type: "add",
        files: "**",
        templateDir: path.resolve(__dirname, "..", "template", "frontend"),
        templateData() {
          const { features } = answers;
          return {
            eslintExtends: features.includes("prettier")
              ? ["eslint:recommended", "plugin:prettier/recommended"]
              : ["eslint:recommended"]
          };
        },
        filters: {
          node_modules: false,
          ".eslintignore": answers.features.includes("eslint"),
          ".eslintrc.js": answers.features.includes("eslint"),
          ".prettierrc.js": answers.features.includes("prettier")
        }
      },
      {
        type: "modify",
        files: "package.json",
        handler(data: any, filepath: string) {
          return {
            name: answers.name || data.name,
            version: answers.version || data.version,
            main: data.main,
            author: answers.author,
            license: answers.license || data.license,
            scripts: data.scripts,
            dependencies: {
              ...data.dependencies
            },
            devDependencies: {
              ...data.devDependencies,
              "@typescript-eslint/eslint-plugin": answers.features.includes(
                "eslint"
              )
                ? data.devDependencies["@typescript-eslint/eslint-plugin"]
                : undefined,
              "@typescript-eslint/parser": answers.features.includes("eslint")
                ? data.devDependencies["@typescript-eslint/parser"]
                : undefined,
              eslint: answers.features.includes("eslint")
                ? data.devDependencies["eslint"]
                : undefined,
              "eslint-config-prettier":
                answers.features.includes("eslint") &&
                answers.features.includes("prettier")
                  ? data.devDependencies["eslint-config-prettier"]
                  : undefined,
              "eslint-plugin-prettier":
                answers.features.includes("eslint") &&
                answers.features.includes("prettier")
                  ? data.devDependencies["eslint-plugin-prettier"]
                  : undefined,
              prettier: answers.features.includes("prettier")
                ? data.devDependencies["prettier"]
                : undefined
            }
          };
        }
      },
      answers.features.includes("eslint") && {
        type: "modify",
        files: ".eslintrc.js",
        handler(data: any, filepath: string) {
          let modified = data;
          if (!answers.features.includes("prettier")) {
            modified = modified.replace(
              'extends: ["eslint:recommended", "plugin:prettier/recommended"]',
              'extends: ["eslint:recommend"]'
            );
          }
          return modified;
        }
      },
      answers.features.includes("eslint") && {
        type: "modify",
        files: ".eslintignore",
        handler(data: any, filepath: string) {
          let modified = data;
          if (!answers.features.includes("prettier")) {
            modified = modified.replace(`!.prettierrc.js\n`, "");
          }
          return modified;
        }
      },
      {
        type: "move",
        patterns: {
          "LICENSE_*": "LICENSE"
        }
      }
    ].filter(Boolean);
  },
  async completed() {
    this.gitInit();
    await this.npmInstall();
    this.showProjectTips();
  }
};

export = config;
