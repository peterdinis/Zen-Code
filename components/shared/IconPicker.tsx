'use client';

import { useTheme } from 'next-themes';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';

interface IconPickerProps {
    onIconChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

export function IconPicker({
    onIconChange,
    children,
    asChild = false,
}: IconPickerProps) {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;
    const themeMap = {
        dark: Theme.DARK,
        light: Theme.LIGHT,
    };
    const theme = themeMap[currentTheme];

    return (
        <>
            <Popover>
                <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
                <PopoverContent className='w-full border-none p-0 shadow-none'>
                    <EmojiPicker
                        height={350}
                        theme={theme}
                        onEmojiClick={(data) => onIconChange(data.emoji)}
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}
