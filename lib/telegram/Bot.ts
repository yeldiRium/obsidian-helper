import { flaschenpost } from "flaschenpost";
import { Telegraf } from "telegraf";

const logger = flaschenpost.getLogger();

interface BotOptions {
  apiToken: string;
  adminId: string;
}

interface Bot {
  launch: () => Promise<void>;
}

const createBot = (options: BotOptions): Bot => {
  const telegrafBot = new Telegraf(options.apiToken);

  telegrafBot.use(async (context, next): Promise<void> => {
    console.log(JSON.stringify(context, undefined, 2));
    await next();
  });

  telegrafBot.start(async (context): Promise<void> => {
    context.reply("hello there");
  });

  return {
    launch: async (): Promise<void> => {
      logger.debug("Launching telegraf bot...");
      await telegrafBot.launch();
      logger.info("Telegraf bot has launched.");
    },
  };
};

export { createBot };
