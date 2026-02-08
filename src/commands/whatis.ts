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
          value: 'This server is a community for [your topic here]. We discuss, share, and collaborate on various topics.',
          inline: false,
        },
        {
          name: '❔ How do I get access to other channels?',
          value: 'Check out the verification/role selection channels to gain access to additional areas of the server.',
          inline: false,
        },
        {
          name: '❔ Who are the moderators?',
          value: 'Moderators have the "Moderator" or "Staff" role. Feel free to reach out if you need help!',
          inline: false,
        },
        {
          name: '❔ Can I suggest features or changes?',
          value: 'Yes! We welcome feedback. Use the suggestions channel or contact a moderator.',
          inline: false,
        },
        {
          name: '❔ How do I report a rule violation?',
          value: 'Contact a moderator directly or use the server\'s report system if available.',
          inline: false,
        },
        {
          name: '❔ Are there any special events?',
          value: 'We host regular events and activities. Check the announcements channel for updates!',
          inline: false,
        },
      )
      .setFooter({ text: 'Have more questions? Contact a staff member!' })
      .setTimestamp();

    await interaction.reply({ embeds: [faqEmbed] });
  },
};