// src/components/atoms/PriceChangeIndicator.tsx
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn'; // We'll create this utility later for Tailwind merging

interface PriceChangeIndicatorProps {
    price: number;
}

export const PriceChangeIndicator: React.FC<PriceChangeIndicatorProps> = ({ price }) => {
    const previousPrice = useRef<number>(price);
    const [flashClass, setFlashClass] = React.useState('');

    useEffect(() => {
        if (price === previousPrice.current) {
            return;
        }

        // Determine the flash color based on price direction
        const newFlashClass = price > previousPrice.current
            ? 'flash-green' // Price increased
            : 'flash-red';  // Price decreased

        setFlashClass(newFlashClass);

        // Remove the flash class after the CSS transition finishes (~1.5s)
        const timer = setTimeout(() => {
            setFlashClass('');
        }, 1500);

        previousPrice.current = price;
        return () => clearTimeout(timer);
    }, [price]);

    return (
        <span
            className={cn(
                "font-mono transition-colors duration-500 ease-out", // Base styling for smooth transition
                flashClass
            )}
        >
            ${price.toFixed(2)}
        </span>
    );
};