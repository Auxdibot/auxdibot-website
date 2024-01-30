export default interface ServerEmojiBody {
    readonly server_icon: string;
    readonly emojis: { name: string, image: string, id: string }[]
  }