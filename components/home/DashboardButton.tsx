'use client';

import useSession from '@/lib/hooks/useSession';
import { HeaderButton } from '../ui/header-button';
import { Settings, User } from 'lucide-react';

export function DashboardButton() {
    const { status } = useSession();
    return status == 'authenticated' ? (
        <HeaderButton className='flex text-2xl font-bold' href={'/dashboard'}>
            <span className='flex items-center gap-2'>
                <Settings /> Dashboard
            </span>
        </HeaderButton>
    ) : (
        <HeaderButton
            className='flex text-2xl font-bold'
            href={'/bot/v1/auth/discord'}
        >
            <span className='flex items-center gap-2'>
                <User /> Sign In
            </span>
        </HeaderButton>
    );
}
