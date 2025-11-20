// src/components/molecules/TokenRow.tsx
import React from 'react';
import { Token } from '@/types/token';
import { cn } from '@/lib/utils/cn';
import { PriceChangeIndicator } from '@/components/atoms/PriceChangeIndicator';

// ✅ NEW IMPORTS
import { useDispatch } from 'react-redux';
import { openTokenModal } from '@/store/slices/tableSlice';

interface TokenRowProps {
    token: Token;
}

// Helper function to format large numbers
const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    }).format(num);
};

// Use React.memo for performance optimization
export const TokenRow: React.FC<TokenRowProps> = React.memo(({ token }) => {

    // ✅ Initialize redux dispatch
    const dispatch = useDispatch();

    const priceChangeColor = token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';

    // Hover effect + click handler
    const handleRowClick = () => {
        // ✅ Dispatch Redux action to open modal
        dispatch(openTokenModal(token.id));

        console.log(`Token clicked: ${token.symbol}`);
    };

    return (
        <div
            className={cn(
                "flex text-sm py-3 px-4 border-b dark:border-zinc-800 transition-colors cursor-pointer",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            )}
            onClick={handleRowClick}
        >
            {/* 1. Token (Symbol & Name) */}
            <div className="w-1/4 flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                    {token.symbol[0]}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold">{token.symbol}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{token.name}</span>
                </div>
            </div>

            {/* 2. Price */}
            <span className="w-[10%] text-right font-medium">
                <PriceChangeIndicator price={token.currentPrice} />
            </span>

            {/* 3. 24H Change */}
            <span className={cn("w-[10%] text-right font-medium", priceChangeColor)}>
                {token.priceChange24h.toFixed(2)}%
            </span>

            {/* 4. Liquidity */}
            <span className="w-[15%] text-right text-gray-500 dark:text-gray-400">
                ${formatNumber(token.liquidity)}
            </span>

            {/* 5. Volume (24H) */}
            <span className="w-[20%] text-right text-gray-500 dark:text-gray-400">
                ${formatNumber(token.volume24h)}
            </span>

            {/* 6. Status */}
            <span className="w-[15%] text-right font-medium text-xs">
                {token.status}
            </span>
        </div>
    );
});

TokenRow.displayName = 'TokenRow';
