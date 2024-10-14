import { cn } from '@/lib/utils';

export function Marquee({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <article className='whitespace-no-wrap flex w-full overflow-x-hidden'>
            <div className={'relative w-full'}>
                <section
                    className={cn(
                        'flex w-max min-w-full animate-marquee',
                        className
                    )}
                >
                    {children}
                </section>
                <section
                    className={cn(
                        'absolute top-0 flex w-max min-w-full animate-marquee2',
                        className
                    )}
                >
                    {children}
                </section>
            </div>
        </article>
    );
}
