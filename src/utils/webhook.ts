import { WebhookClient, EmbedBuilder } from 'discord.js';

/**
 * Sends one or more embeds to a webhook URL in a single message.
 * Discord allows up to 10 embeds per message.
 * @param webhookUrl - The full Discord webhook URL
 * @param embeds - One or more EmbedBuilder instances
 * @param username - Optional display name override for the webhook
 * @param avatarURL - Optional avatar URL override for the webhook
 */
export async function sendEmbedViaWebhook(
  webhookUrl: string,
  embeds: EmbedBuilder | EmbedBuilder[],
  username?: string,
  avatarURL?: string,
): Promise<void> {
  const client = new WebhookClient({ url: webhookUrl });

  await client.send({
    embeds: Array.isArray(embeds) ? embeds : [embeds],
    ...(username && { username }),
    ...(avatarURL && { avatarURL }),
  });

  client.destroy();
}