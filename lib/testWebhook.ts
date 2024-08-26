export function testWebhook(url: string) {
    return /https:\/\/discord.com\/api\/webhooks\/[^\s\/]+?(?=\b)/.test(url);
}
