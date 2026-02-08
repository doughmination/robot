import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
  PresenceUpdateStatus ,
} from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

// Extended client interface to include commands collection
interface ExtendedClient extends Client {
  commands: Collection<string, any>;
}

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
}) as ExtendedClient;

// Initialize commands collection
client.commands = new Collection();

// Bot token and client ID from environment variables
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
  console.error(chalk.red('✗ Missing DISCORD_TOKEN or CLIENT_ID environment variable'));
  process.exit(1);
}

// Load commands from /commands folder
async function loadCommands() {
  const commandsPath = join(__dirname, 'commands');
  const commandFiles = readdirSync(commandsPath).filter(file => 
    file.endsWith('.ts') || file.endsWith('.js')
  );

  const commandsData = [];

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);
    
    // Support both default and named exports
    const commandModule = command.default || command;

    if ('data' in commandModule && 'execute' in commandModule) {
      client.commands.set(commandModule.data.name, commandModule);
      commandsData.push(commandModule.data.toJSON());
      console.log(chalk.green(`✓ Loaded command: ${chalk.bold(commandModule.data.name)}`));
    } else {
      console.warn(chalk.yellow(`⚠ Command at ${filePath} is missing "data" or "execute" property`));
    }
  }

  return commandsData;
}

// Register slash commands with Discord
async function deployCommands(commandsData: any[]) {
  try {
    console.log(chalk.cyan('Started refreshing application (/) commands.'));

    const rest = new REST({ version: '10' }).setToken(TOKEN!);

    await rest.put(
      Routes.applicationCommands(CLIENT_ID!),
      { body: commandsData },
    );

    console.log(chalk.green('Successfully reloaded application (/) commands.'));
  } catch (error) {
    console.error(chalk.red('Error deploying commands:'), error);
  }
}

// Handle interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(chalk.red(`No command matching ${interaction.commandName} was found.`));
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(chalk.red(`Error executing ${interaction.commandName}:`), error);
    
    const errorMessage = { 
      content: 'There was an error while executing this command!', 
      ephemeral: true 
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Bot ready event
client.once('clientReady', () => {
  console.log(chalk.magentaBright('\n╔═════════════════════════════════════════════════════════╗'));
  console.log(chalk.magentaBright('║  Doughmination System Robot - UnifiedGaming Systems Ltd ║'));
  console.log(chalk.magentaBright('╚═════════════════════════════════════════════════════════╝\n'));
  console.log(chalk.green(`✓ Logged in as ${chalk.bold(client.user?.tag)}`));
  console.log(chalk.green(`✓ Bot is ready and running!\n`));
  client.user?.setPresence({ activities: [{ name: 'UnifiedGaming Systems Ltd' }], status: PresenceUpdateStatus.Idle})
});

// Initialize bot
async function start() {
  try {
    // Load commands
    const commandsData = await loadCommands();
    
    // Deploy commands to Discord
    await deployCommands(commandsData);
    
    // Login to Discord
    await client.login(TOKEN!);
  } catch (error) {
    console.error(chalk.red('Error starting bot:'), error);
    process.exit(1);
  }
}

// Start the bot
start();