#!/usr/bin/env node

const path = require("path");
const sao = require("sao");

const generator = path.resolve(__dirname, "..", "lib");
const outDir = path.resolve(process.argv[2] || ".");
sao({ generator, outDir })
  .run()
  .catch(sao.handleError);
