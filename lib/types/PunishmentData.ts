import { PunishmentType } from './PunishmentType';

export default interface PunishmentData {
    type: PunishmentType;
    expired: boolean;
    date: string;
    expires_date?: string;
    reason: string;
    dmed: boolean;
    userID: string;
    moderatorID?: string;
    punishmentID: number;
}
