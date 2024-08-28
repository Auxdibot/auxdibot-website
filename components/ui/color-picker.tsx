'use client';

import { useEffect, useRef, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { BsX } from 'react-icons/bs';

interface ColorPickerProps {
    readonly value: string;
    readonly onChange: (...event: any[]) => void;
    readonly string?: boolean;
    readonly md?: boolean;
}

export default function ColorPicker({
    value,
    onChange,
    string,
    md,
}: ColorPickerProps) {
    const [expandedColor, setExpandedColor] = useState(false);
    const colorRef = useRef<HTMLLabelElement | null>(null);
    useEffect(() => {
        const clickedOutside = (e: globalThis.MouseEvent) => {
            if (
                expandedColor &&
                colorRef.current &&
                !colorRef.current.contains(e.target as Node)
            )
                setExpandedColor(false);
        };
        document.addEventListener('mousedown', clickedOutside);
        return () => document.removeEventListener('mousedown', clickedOutside);
    }, [expandedColor]);
    return (
        <span
            ref={colorRef}
            className={`flex flex-row ${md ? '' : 'max-md:'}:mx-auto relative items-center gap-2 font-open-sans text-xl`}
        >
            <span
                className={`flex flex-col ${md ? 'h-36' : 'md:h-12'} relative ${md ? '' : 'max-md:'}items-center`}
            >
                <span
                    className={`secondary flex items-center text-xl text-gray-300 ${md ? '' : 'max-md:'}justify-center my-3 gap-2`}
                >
                    <span
                        className={
                            'hover-gradient w-fit cursor-pointer rounded-2xl border p-1 text-lg text-white transition-all hover:border-black hover:text-black'
                        }
                        onClick={() => setExpandedColor(!expandedColor)}
                    >
                        <div
                            className={
                                'h-6 w-12 rounded-2xl border border-white shadow-2xl'
                            }
                            style={{
                                backgroundColor: value ? `#${value}` : 'black',
                            }}
                        ></div>
                    </span>
                    <HexColorInput
                        aria-valuenow={parseInt(value, 16)}
                        color={value}
                        className='flex h-9 w-20 rounded-md border border-gray-200 bg-transparent px-3 py-1 font-open-sans text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300'
                        onChange={(newColor) =>
                            onChange(
                                !string
                                    ? parseInt(newColor.replace('#', ''), 16)
                                    : newColor.replace('#', '')
                            )
                        }
                    />
                    <span
                        className={
                            'secondary flex flex-row items-center gap-2 text-xl text-gray-300'
                        }
                    >
                        <span
                            className={
                                'hover-gradient w-fit cursor-pointer rounded-2xl border border-gray-700 p-1 text-xl text-gray-600 transition-all hover:border-black hover:text-black'
                            }
                            onClick={() => onChange(undefined)}
                        >
                            <BsX />
                        </span>
                    </span>
                </span>
                {expandedColor && (
                    <HexColorPicker
                        aria-valuenow={parseInt(value, 16)}
                        className={`z-30 flex-none animate-colorPicker touch-none md:absolute`}
                        onChange={(newColor) =>
                            onChange(
                                !string
                                    ? parseInt(newColor.replace('#', ''), 16)
                                    : newColor.replace('#', '')
                            )
                        }
                    />
                )}
            </span>
        </span>
    );
}
