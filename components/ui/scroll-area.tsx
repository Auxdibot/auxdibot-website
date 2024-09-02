import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

const useScrollFixForModalPopovers = () => {
    const touchPosRef = React.useRef<number | null>(null);

    const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const isScrollingDown = event.deltaY > 0;

        if (isScrollingDown) {
            event.currentTarget.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowDown' })
            );
        } else {
            event.currentTarget.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowUp' })
            );
        }
    };

    const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        touchPosRef.current = event.changedTouches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        const touchPos = event.changedTouches[0]?.clientY ?? null;

        if (touchPosRef.current === null || touchPos === null) {
            return;
        }

        event.stopPropagation();

        const isScrollingDown = touchPosRef.current < touchPos;

        if (isScrollingDown) {
            event.currentTarget.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowDown' })
            );
        } else {
            event.currentTarget.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowUp' })
            );
        }

        touchPosRef.current = touchPos;
    };

    return { onWheel, onTouchStart, onTouchMove };
};

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}
        {...useScrollFixForModalPopovers()}
    >
        <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<
        typeof ScrollAreaPrimitive.ScrollAreaScrollbar
    >
>(({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            'flex touch-none select-none transition-colors',
            orientation === 'vertical' &&
                'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' &&
                'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            className
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-gray-200 dark:bg-gray-800' />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
