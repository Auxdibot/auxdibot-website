import Twemoji from "@/components/ui/emojis/twemoji";
import { createEmojiList } from "../createEmojiList";

export const emojis = createEmojiList().filter((i) => Number(i.group) != 2).map((i) => ({ ...i, emojis: i.emojis.map((emoji) => ({...emoji, twemoji: <Twemoji key={emoji.order}>{emoji.hexcode.toLowerCase()}</Twemoji>}))}));