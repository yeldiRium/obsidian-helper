import { buntstift } from "buntstift";
import { Command } from "command-line-interface";
import { flaschenpost } from "flaschenpost";

import { createBot } from "../telegram/index.js";
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
      {
        name: "apiToken",
        description: "telegram API token for the bot",
        type: "string",
        isRequired: true,
      },
      {
        name: "adminId",
        description:
          "ID of the admin user. only they are able to interact with the bot",
        type: "string",
        isRequired: true,
      },
    ],

    async handle({ options }): Promise<void> {
      buntstift.configure(
        buntstift.getConfiguration().withVerboseMode(options.verbose),
      );
      flaschenpost.configure(
        flaschenpost
          .getConfiguration()
          .withHighestEnabledLogLevel(options.verbose ? "debug" : "info"),
      );

      const bot = createBot({
        apiToken: options.apiToken,
        adminId: options.adminId,
      });

      await bot.launch();
    },

    subcommands: {},
  };
};

export { rootCommand };
