import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import { sendEmbedViaWebhook } from '../utils/webhook';

const ICON_URL = 'https://cdn.doughmination.win/cdn/general/icon.png';
const SAPPHIRE_URL = 'https://cdn.doughmination.win/cdn/general/saphh.png';

export default {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Post the server rules via webhook')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction: ChatInputCommandInteraction) {
    const webhookUrl = process.env.WEBHOOK_RULES;

    if (!webhookUrl) {
      await interaction.reply({
        content: '⚠️ `WEBHOOK_RULES` is not set in the environment. Please add it to your `.env` file.',
        ephemeral: true,
      });
      return;
    }

    // ── Embed 1: Full rules ────────────────────────────────────────────────
    const rulesEmbed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle('Welcome! When joining this server, you agree to the following rules')
      .setThumbnail(ICON_URL)
      .setDescription(
        [
          '## Section 1 - TOS',
          '### 1.1 - Follow Discord\'s Terms of Service and Guidelines:',
          '> https://discordapp.com/terms',
          '> https://discordapp.com/guidelines',
          '',
          '## Section 2 - Server and Staff Conduct',
          '### 2.1 - Keep profiles SFW:',
          '> This includes anything NSFW, offensive or racist content, flashing images, nazi/facist imagery, etc.',
          '### 2.2 - Don\'t message staff for server relating things:',
          '> We have a tickets system in place if someone needs to be reported, along with a /report command for the same purpose.',
          '### 2.3 - Don\'t mention staff without reason:',
          '> Only mention staff if there is something that requires staff assistance',
          '### 2.4 - No self-advertising:',
          '> Self advertising in any way (by linking your socials in any way) is completely disallowed in the server',
          '### 2.5 - No malicious alt account usage',
          '> While alt accounts are allowed, using them to avoid punishment will lead to further action',
          '### 2.6 - Don\'t abuse bugs/exploits:',
          '> If you know of a bug, report it by making a ticket',
          '### 2.7 - Listen to the staff team:',
          '> Staff are in place to uphold all server rules, and keep the community safe, and will enforce sanctions if needed!',
          '### 2.8 - Ban rights reserved:',
          '> Staff of the Doughmination System have full permission to ban anyone based on prior behavior elsewhere to maintain a safe and welcoming space',
          '',
          '## Section 3 - Chat Rules',
          '### 3.1 - No Spamming',
          '> Spamming text, voice changers, soundboards, etc. isn\'t allowed',
          '### 3.2 - No brainrot',
          '> Anything brainrot, such as terminology, videos, images, etc. isn\'t allowed here',
          '### 3.3 - No NSFW Content',
          '> NSFW Content of any kind is NOT allowed here. This includes flashing images that could trigger seizures',
          '### 3.4 - No Sensitive Topics',
          '> Topics, such as war, religion, politics, are to be kept outside of the normal channels',
          '### 3.5 - Be Respectful',
          '> Saying things that are fascist, racist, and/or hateful in any way isn\'t allowed here.',
          '### 3.6 - No Arguments',
          '> It is prohibited to start & participate in any arguments.',
          '### 3.7 - No Flirting',
          '> Flirting of any kind (joke or not) isn\'t allowed here, and should move to DMs (If consensual)',
          '### 3.8 - English Only:',
          '> For the sake of moderation, please keep any and all conversations in English (in both normal channels and VC)',
          '### 3.9 - No Malicious Content',
          '> Sending things such as IP Grabbers, viruses, token loggers, crash links, etc. will get you banned',
          '### 3.10 - AI \'content\'',
          '> Anything created by AI will be deleted from the server. If you attempt to pass off something generated through AI as your own, you will be banned.',
        ].join('\n'),
      )
      .setFooter({ text: 'v1', iconURL: ICON_URL })
      .setTimestamp();

    // ── Embed 2: Report reminder ───────────────────────────────────────────
    const reportEmbed = new EmbedBuilder()
      .setColor(0xE71010)
      .setThumbnail(SAPPHIRE_URL)
      .setDescription(
        '### You can report users by using /report from Sapphire!\n' +
        'Please do that whenever you need a staff member to take care of a user breaking rule that you don\'t want to reveal you report.\n' +
        '***Misuse will be punished!***',
      )
      .setTimestamp();

    // ── Embed 3: Attribution ───────────────────────────────────────────────
    const attributionEmbed = new EmbedBuilder()
      .setDescription('> -# Rules are borrowed from Girls Network Server. <https://discord.com/transfemme>')
      .setTimestamp();

    try {
      await sendEmbedViaWebhook(
        webhookUrl,
        [rulesEmbed, reportEmbed, attributionEmbed],
        'Doughmination System',
        ICON_URL,
      );

      await interaction.reply({
        content: '✅ Rules have been posted successfully.',
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error posting rules via webhook:', error);
      await interaction.reply({
        content: '❌ Failed to post rules. Check that `WEBHOOK_RULES` is a valid Discord webhook URL.',
        ephemeral: true,
      });
    }
  },
};