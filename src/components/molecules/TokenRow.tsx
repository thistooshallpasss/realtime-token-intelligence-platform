import React from 'react';
import { Token } from '@/types/token';
import { cn } from '@/lib/utils/cn';
import { PriceChangeIndicator } from '@/components/atoms/PriceChangeIndicator';

// Redux
import { useDispatch } from 'react-redux';
import { openTokenModal } from '@/store/slices/tableSlice';

// Sparkline
import { Sparkline } from '@/components/atoms/Sparkline';

// Status Badge
import { StatusBadge } from '@/components/molecules/StatusBadge';

// ⭐ NEW Token Hover Popover
import { TokenHoverPopover } from '@/components/molecules/TokenHoverPopover';

interface TokenRowProps {
    token: Token;
}

// Helper to format large numbers
const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    }).format(num);

export const TokenRow: React.FC<TokenRowProps> = React.memo(({ token }) => {
    const dispatch = useDispatch();

    const priceChangeColor =
        token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';
    const isPositive = token.priceChange24h >= 0;

    const handleRowClick = () => {
        dispatch(openTokenModal(token.id));
        console.log(`Token clicked: ${token.symbol}`);
    };

    return (
        <div
            className={cn(
                "flex text-sm py-3 px-4 border-b dark:border-zinc-800 transition-colors cursor-pointer relative z-10", // 💡 Added 'relative z-10'
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            )}
            onClick={handleRowClick}
        >

            {/* 1. Token (Symbol & Name) — 25% */}
            <div className="w-1/4 flex items-center gap-3">
                <TokenHoverPopover token={token}>
                    <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                        {token.symbol[0]}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">{token.symbol}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {token.name}
                        </span>
                    </div>
                </TokenHoverPopover>
            </div>

            {/* 2. Price — 10% */}
            <span className="w-[10%] text-right font-medium">
                <PriceChangeIndicator price={token.currentPrice} />
            </span>

            {/* 3. 24H % — 10% */}
            <span className={cn("w-[10%] text-right font-medium", priceChangeColor)}>
                {token.priceChange24h.toFixed(2)}%
            </span>

            {/* 4. Sparkline — 15% */}
            <div className="w-[15%] flex justify-end items-center pr-4">
                <Sparkline data={token.sparklineData} isPositive={isPositive} />
            </div>

            {/* 5. Liquidity — 10% */}
            <span className="w-[10%] text-right text-gray-500 dark:text-gray-400">
                ${formatNumber(token.liquidity)}
            </span>

            {/* 6. Volume 24H — 15% */}
            <span className="w-[15%] text-right text-gray-500 dark:text-gray-400">
                ${formatNumber(token.volume24h)}
            </span>

            {/* 7. Status — 15% */}
            <div className="w-[15%] flex justify-end items-center">
                <StatusBadge status={token.status} />
            </div>
        </div>
    );
});

TokenRow.displayName = 'TokenRow';
