// src/components/ui/TableSkeleton.tsx
import React from 'react';
import { cn } from '@/lib/utils/cn';

interface TableSkeletonProps {
    rows?: number;
}

// Individual Skeleton Row
const SkeletonRow: React.FC = () => (
    <div className="flex text-sm py-3 px-4 border-b dark:border-zinc-800 animate-pulse">
        {/* 1. Token */}
        <div className="w-1/4 flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
            <div className="flex flex-col">
                <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-700 rounded mb-1"></div>
                <div className="h-2 w-12 bg-gray-100 dark:bg-zinc-800 rounded"></div>
            </div>
        </div>

        {/* 2. Price */}
        <div className="w-[10%] text-right">
            <div className="h-3 w-10 bg-gray-200 dark:bg-zinc-700 rounded inline-block"></div>
        </div>

        {/* 3. 24H Change */}
        <div className="w-[10%] text-right">
            <div className="h-3 w-8 bg-gray-200 dark:bg-zinc-700 rounded inline-block"></div>
        </div>

        {/* 4. Liquidity */}
        <div className="w-[15%] text-right">
            <div className="h-3 w-14 bg-gray-200 dark:bg-zinc-700 rounded inline-block"></div>
        </div>

        {/* 5. Volume (24H) */}
        <div className="w-[20%] text-right">
            <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-700 rounded inline-block"></div>
        </div>

        {/* 6. Status/Category */}
        <div className="w-[15%] text-right">
            <div className="h-3 w-10 bg-gray-200 dark:bg-zinc-700 rounded inline-block"></div>
        </div>
    </div>
);

// Main Table Skeleton
export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 10 }) => {
    return (
        <div className="w-full bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg min-w-[700px]">
            {/* Header placeholder - use a static header or a slightly lighter skeleton */}
            <div className="flex text-xs font-semibold text-gray-500 uppercase py-2 px-4 border-b dark:border-zinc-800">
                <span className="w-1/4">Token</span>
                <span className="w-[10%] text-right">Price</span>
                <span className="w-[10%] text-right">24H %</span>
                <span className="w-[15%] text-right">Liquidity</span>
                <span className="w-[20%] text-right">Volume (24H)</span>
                <span className="w-[15%] text-right">Status</span>
            </div>

            {/* Render the specified number of rows */}
            {Array.from({ length: rows }).map((_, index) => (
                <SkeletonRow key={index} />
            ))}
        </div>
    );
};