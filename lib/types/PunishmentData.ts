import { PunishmentType } from './PunishmentType';

export default interface PunishmentData {
    type: PunishmentType;
    expired: boolean;
    date_unix: number;
    expires_date_unix?: number;
    reason: string;
    dmed: boolean;
    userID: string;
    moderatorID?: string;
    punishmentID: number;
}
