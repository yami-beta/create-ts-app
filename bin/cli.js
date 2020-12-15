#!/usr/bin/env node

const { run } = require("../lib");

run(process.argv.slice(2))
  .then(({ success }) => process.exit(success ? 0 : 1))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
