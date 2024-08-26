import { useEffect, useState } from 'react';

export default function useMousePosition() {
    const [pos, setPos] = useState<{ x: number | null; y: number | null }>({
        x: null,
        y: null,
    });
    useEffect(() => {
        function updateMousePosition(ev: any) {
            let x, y;
            if (ev.touches) {
                const touch = ev.touches[0];
                [x, y] = [touch.pageX, touch.pageY];
            } else {
                [x, y] = [ev.pageX, ev.pageY];
            }
            setPos({ x, y });
        }
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return pos;
}
