#!/usr/bin/env node

const { Command } = require("commander");
const parse = require("../src/parser");
const gendiff = require("../src/index");

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.1.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format [type]", "output format", "stylish")
  .helpOption("-h, --help", "display help for command")
  .action((filepath1, filepath2 /* options не используется — убрали */) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const result = gendiff(data1, data2);
    console.log(result);
  })
  .parse();
