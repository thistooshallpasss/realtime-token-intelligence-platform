// src/components/molecules/StatusBadge.tsx
import React from 'react';
import { cn } from '@/lib/utils/cn';
import { TokenStatus } from '@/types/token';

interface StatusBadgeProps {
    status: TokenStatus;
}

const statusMap: Record<TokenStatus, { color: string; description: string }> = {
    'New pairs': {
        color: 'bg-green-500/20 text-green-500 border-green-500',
        description: 'Newly listed pair, monitor for volatility.'
    },
    'Final Stretch': {
        color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500',
        description: 'Approaching listing/migration completion.'
    },
    'Migrated': {
        color: 'bg-blue-500/20 text-blue-500 border-blue-500',
        description: 'Successfully migrated to the new contract.'
    },
};

export const StatusBadge: React.FC<StatusBadgeProps> = React.memo(({ status }) => {
    const { color, description } = statusMap[status];

    return (
        // Tooltip Container (using Tailwind for simple hover effect)
        <div className="group relative inline-block">
            <span
                className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-150 border",
                    color
                )}
            >
                {status}
            </span>

            {/* Tooltip Content (hidden by default) */}
            <div
                role="tooltip"
                className={cn(
                    "absolute left-1/2 -top-10 z-20 transform -translate-x-1/2 opacity-0",
                    "group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300",
                    "bg-zinc-700 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none"
                )}
            >
                {description}
                <div className="absolute left-1/2 top-full h-2 w-2 transform -translate-x-1/2 rotate-45 bg-zinc-700"></div>
            </div>
        </div>
    );
});

StatusBadge.displayName = 'StatusBadge';