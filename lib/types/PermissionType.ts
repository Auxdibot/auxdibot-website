import { APIEmbed } from 'discord-api-types/v10';

type PermissionType = {
  role?: { name: string, id: string };
  user?: { username: string, avatar: string, id: string };
  allowed: boolean;
  permission: string;
  index: number;
};

export default PermissionType;