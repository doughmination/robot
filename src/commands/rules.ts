import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Display the server rules')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction: ChatInputCommandInteraction) {
    const rulesEmbed = new EmbedBuilder()
      .setColor(0xFF0000) // Red color
      .setTitle('📜 Server Rules')
      .setDescription('Please follow these rules to keep our community safe and enjoyable for everyone.')
      .addFields(
        {
          name: '1️⃣ Be Respectful',
          value: 'Treat all members with respect. No harassment, hate speech (including but not limited to pluraphobia, homophobia, transphobia, racism), or discrimination.',
          inline: false,
        },
        {
          name: '2️⃣ No Spam',
          value: 'Avoid spamming messages, emojis, or mentions. Keep conversations meaningful.',
          inline: false,
        },
        {
          name: '3️⃣ No NSFW Content',
          value: 'Keep all content appropriate. Minors are welcome in this server, so we enforce that NSFW content is strictly prohibited.',
          inline: false,
        },
        {
          name: '4️⃣ Follow Discord ToS',
          value: 'All members must follow Discord\'s Terms of Service and Community Guidelines. See [here](https://discord.com/terms)',
          inline: false,
        },
        {
          name: '5️⃣ Use Appropriate Channels',
          value: 'Post content in the relevant channels. Keep topics organized.',
          inline: false,
        },
        {
          name: '6️⃣ No Self-Promotion',
          value: 'Do not advertise or promote without permission from staff.',
          inline: false,
        },
        {
          name: 'Pernament invite link',
          value: 'https://discord.gg/RQDRzK3VBe'
        }
      )
      .setFooter({ text: 'Violations may result in warnings, mutes, or bans.' })
      .setTimestamp();

    await interaction.reply({ embeds: [rulesEmbed] });
  },
};