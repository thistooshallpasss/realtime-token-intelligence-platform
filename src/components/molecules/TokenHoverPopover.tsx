// src/components/molecules/TokenHoverPopover.tsx
import React, { useState } from 'react';
import { Token } from '@/types/token';
import { cn } from '@/lib/utils/cn';

interface TokenHoverPopoverProps {
    token: Token;
    children: React.ReactNode;
}

export const TokenHoverPopover: React.FC<TokenHoverPopoverProps> = ({ token, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            {/* 💡 FIX #10: Trigger hover only on the visible children */}
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {children}
            </div>

            {/* Popover Content */}
            {isOpen && (
                <div
                    className={cn(
                        "absolute left-full top-1/2 transform -translate-y-1/2 translate-x-3 z-50",
                        "bg-zinc-800 text-white p-3 rounded-lg shadow-xl border border-zinc-700 min-w-48",
                        "pointer-events-none" // 💡 FIX #1: Popover does not block mouse clicks
                    )}
                >
                    <h4 className="font-bold text-sm mb-1">{token.name} Quick Stats</h4>
                    <ul className="text-xs space-y-0.5">
                        <li>
                            Market Cap: $
                            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(token.marketCap)}
                        </li>
                        <li>
                            24H Volume: $
                            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(token.volume24h)}
                        </li>
                        <li>
                            Current Liquidity: $
                            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(token.liquidity)}
                        </li>
                    </ul>

                    {/* Triangle Pointer */}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-3 h-3 rotate-45 bg-zinc-800 border-l border-b border-zinc-700 translate-x-1"></div>
                </div>
            )}
        </div>
    );
};
