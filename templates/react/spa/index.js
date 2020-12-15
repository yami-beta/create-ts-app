module.exports = {
  prompt: ({ prompter, args }) => {
    const { name } = args;
    const questions = [
      {
        type: "input",
        name: "name",
        message: "Name",
        initial: name,
      },
      {
        type: "input",
        name: "version",
        message: "Version",
        initial: "0.0.0",
      },
      {
        type: "input",
        name: "author",
        message: "Author",
      },
      {
        type: "select",
        name: "license",
        message: "License",
        choices: ["UNLICENSED", "MIT"],
      },
    ];
    return prompter.prompt(questions).then((answers) => {
      const { license, author } = answers;
      const questions = [
        license === "MIT" && {
          type: "input",
          name: "licenseOwner",
          message: "License owner",
          initial: author,
        },
      ].filter(Boolean);
      return prompter.prompt(questions).then((nextAnswers) => ({
        ...answers,
        ...nextAnswers,
      }));
    });
  },
};
