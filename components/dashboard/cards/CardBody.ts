'use client';
import { CardData } from '@/lib/types/CardData';

export type CardBody = Omit<CardData, 'rules' | 'channel'> & {
    rulesField: { rule: string }[];
} & { channelID: string };
