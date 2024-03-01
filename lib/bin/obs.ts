#!/usr/bin/env -S node --loader ts-node/esm --experimental-specifier-resolution=node --no-warnings

import { runCli } from "command-line-interface";
import { buntstift, ColorLevel } from "buntstift";

import { getHandlers } from "../cli/getHandlers.js";
import { rootCommand } from "../cli/rootCommand.js";

try {
  buntstift.configure(
    buntstift.getConfiguration().withColorLevel(ColorLevel.Ansi),
  );

  await runCli({
    rootCommand: rootCommand(),
    argv: process.argv,
    handlers: getHandlers(),
  });

  process.exit(0);
} catch (error: unknown) {
  buntstift.info((error as Error).message);
  buntstift.error("An unexpected error occured.");

  process.exit(1);
}
