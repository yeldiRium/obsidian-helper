import { buntstift } from "buntstift";
import { Command } from "command-line-interface";

import { RootOptions } from "./RootOptions.js";

const rootCommand = function (): Command<RootOptions> {
  return {
    name: "obs",
    description:
      "obs is a telegram bot that helps me keep my obsidian notebook up to date",

    optionDefinitions: [
      {
        name: "verbose",
        alias: "v",
        description: "enable verbose mode",
        type: "boolean",
        isRequired: false,
        defaultValue: false,
      },
    ],

    async handle({ options, ancestors, getUsage }): Promise<void> {
      buntstift.configure(
        buntstift.getConfiguration().withVerboseMode(options.verbose),
      );

      buntstift.raw(getUsage({ commandPath: [...ancestors, "obs"] }));
    },

    subcommands: {},
  };
};

export { rootCommand };
