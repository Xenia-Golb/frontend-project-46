#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "Output format", "stylish")
  .helpOption("-h, --help", "Display help for command")
  .parse();
