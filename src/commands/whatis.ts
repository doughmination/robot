import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('whatis')
    .setDescription('Display FAQ information')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction: ChatInputCommandInteraction) {
    const faqEmbed = new EmbedBuilder()
      .setColor(0x0099FF) // Blue color
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
          value: 'Doughmination System is the trading name for UnifiedGaming Systems Ltd, a UK based company, focused on programming accessibility tools',
          inline: false,
        },
        {
          name: '❔ What is Doughmination even? And why are there Doughmination Modding and Doughmination Coding?',
          value: 'Doughmination is the name created by us when we was looking for other nicknames, Modding is for stuff related to game modding, like Minecraft and Hytale, and Coding is for more personal projects like GitCommit and Badges',
          inline: false
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
          value: 'Please use /report and we will look into it',
          inline: false,
        },
      )
      .setFooter({ text: 'Have more questions? Contact a staff member!' })
      .setTimestamp();

    await interaction.reply({ embeds: [faqEmbed] });
  },
};