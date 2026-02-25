import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import { sendEmbedViaWebhook } from '../utils/webhook';

export default {
  data: new SlashCommandBuilder()
    .setName('whatis')
    .setDescription('Post FAQ information via webhook')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction: ChatInputCommandInteraction) {
    const webhookUrl = process.env.WEBHOOK_WHATIS;

    if (!webhookUrl) {
      await interaction.reply({
        content: '⚠️ `WEBHOOK_WHATIS` is not set in the environment. Please add it to your `.env` file.',
        ephemeral: true,
      });
      return;
    }

    // ── Embed 1: General FAQ ───────────────────────────────────────────────
    const faqEmbed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle('❓ Frequently Asked Questions')
      .setDescription('Here are answers to some commonly asked questions about our server.')
      .addFields(
        {
          name: '❔ What is this server about?',
          value: 'This server is a community for Doughmination System. We discuss, share, and collaborate on various topics.',
          inline: false,
        },
        {
          name: '❔ What is Doughmination System?',
          value: 'Doughmination System is the trading name for UnifiedGaming Systems Ltd, a UK based company, focused on programming accessibility tools.',
          inline: false,
        },
        {
          name: '❔ Who are the moderators?',
          value: 'Staff are <@1125844710511104030> and anyone with the "Staff" role. Feel free to reach out if you need help!',
          inline: false,
        },
        {
          name: '❔ Can I suggest features or changes?',
          value: 'Yes! We welcome feedback. Use the suggestions channel or contact a moderator.',
          inline: false,
        },
        {
          name: '❔ How do I report a rule violation?',
          value: 'Please use /report and we will look into it.',
          inline: false,
        },
        {
          name: '❔ What is the server permanent invite?',
          value: 'https://discord.gg/RQDRzK3VBe',
          inline: false,
        },
      )
      .setFooter({ text: 'Have more questions? Contact a staff member!' })
      .setTimestamp();

    // ── Embed 2: Clarity on the Doughmination names ────────────────────────
    const namesEmbed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle('Clarity on the Doughmination names')
      .setDescription(
        [
          '## Registered Names',
          '### Doughmination System',
          'This is a registered trademark in the UK, with the IPO Trade Mark Journal Number UK00004263144.',
          'This is the trading name for UnifiedGaming Systems Ltd, a UK company with company number 16108983.',
          'The name Doughmination is shorthand for Doughmination System.',
          '### ESAL-1.3',
          'ESAL-1.3 (or the Estrogen Source Available Licence v1.3) is a Licence created and maintained by Doughmination System. Any source code with the ESAL-1.3 is automatically owned by Doughmination System.',
          "You may create a variant of the ESAL-1.3, as long as it does not keep the full name, or pertain the pattern of the original licence (Ie, Estrogen Source Licence wouldn't be allowed, but Doughnut Cheese Licence would be)",
          '',
          '## Unregistered Names',
          '### Doughmination Modding',
          'The game modding division of my company, for Hytale and Minecraft, however will be expanding into further divisions.',
          '### Doughmination Coding',
          'This is moreso my other software created for personal projects, and in my spare time.',
          '### Zahra Co',
          'The name used for <@1475052462410043514>',
        ].join('\n'),
      )
      .setTimestamp();

    // ── Embed 3: AI disclaimer ─────────────────────────────────────────────
    const aiEmbed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle('A note on AI usage')
      .setDescription(
        'The amount of AI generated content across all Doughmination System projects amounts to **less than 10%** of total content, ' +
        'and is used purely at a debugging level, never for generating creative, legal, or product output. ' +
        'We do not pass off AI generated content as our own work, and instead show the use with the LLM used (usually Claude AI)',
      )
      .setTimestamp();

    try {
      await sendEmbedViaWebhook(
        webhookUrl,
        [faqEmbed, namesEmbed, aiEmbed],
        'Doughmination System',
      );

      await interaction.reply({
        content: '✅ FAQ has been posted successfully.',
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error posting FAQ via webhook:', error);
      await interaction.reply({
        content: '❌ Failed to post FAQ. Check that `WEBHOOK_WHATIS` is a valid Discord webhook URL.',
        ephemeral: true,
      });
    }
  },
};