'use client';

import React from 'react';
import { useTokenData } from '@/lib/hooks/useTokenData';
import { useTableSorting } from '@/lib/hooks/useTableSorting';
import { TokenRow } from '@/components/molecules/TokenRow';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { Token, SortField } from '@/types/token';
import { cn } from '@/lib/utils/cn';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface HeaderCellProps {
    field: SortField;
    label: string;
    onSort: (field: SortField) => void;
    isSorting: boolean;
    direction: 'asc' | 'desc';
    className?: string;
}

const SortableHeaderCell: React.FC<HeaderCellProps> = ({
    field, label, onSort, isSorting, direction, className
}) => {
    return (
        <button
            className={cn(
                "flex items-center justify-end gap-1 bg-transparent border-none p-0 " +
                "cursor-pointer hover:text-white transition-colors font-semibold " +
                "text-gray-500 uppercase text-xs",
                className
            )}
            onClick={() => onSort(field)}
            aria-label={`Sort by ${label}`}   // ♿ ADD ARIA LABEL
        >
            {label}
            {isSorting && (
                direction === 'asc'
                    ? <ArrowUp size={14} className="text-blue-400" />
                    : <ArrowDown size={14} className="text-blue-400" />
            )}
        </button>
    );
};

const TableHeader: React.FC<{
    currentSortField: SortField | null;
    sortDirection: 'asc' | 'desc';
    handleSort: (field: SortField) => void;
}> = ({ currentSortField, sortDirection, handleSort }) => (
    <div className="flex text-xs font-semibold text-gray-500 uppercase py-2 px-4 border-b dark:border-zinc-800 sticky top-0 bg-white dark:bg-[#0a0a0a] z-10">
        <span className="w-1/4">Token</span>

        <SortableHeaderCell
            field="currentPrice"
            label="Price"
            onSort={handleSort}
            isSorting={currentSortField === 'currentPrice'}
            direction={sortDirection}
            className="w-[10%]"
        />
        <SortableHeaderCell
            field="priceChange24h"
            label="24H %"
            onSort={handleSort}
            isSorting={currentSortField === 'priceChange24h'}
            direction={sortDirection}
            className="w-[10%]"
        />
        <SortableHeaderCell
            field="liquidity"
            label="Liquidity"
            onSort={handleSort}
            isSorting={currentSortField === 'liquidity'}
            direction={sortDirection}
            className="w-[15%]"
        />
        <SortableHeaderCell
            field="volume24h"
            label="Volume (24H)"
            onSort={handleSort}
            isSorting={currentSortField === 'volume24h'}
            direction={sortDirection}
            className="w-[20%]"
        />

        <span className="w-[15%] text-right">Status</span>
    </div>
);

export const TokenTradingTable: React.FC = () => {
    const { data: tokens, isLoading, isError } = useTokenData();

    // Sorting hook
    const { sortedData, currentSortField, sortDirection, handleSort } =
        useTableSorting(tokens || []);

    if (isError) {
        return <div className="text-center text-red-500 p-8">Error loading token data.</div>;
    }

    if (isLoading) {
        return <TableSkeleton rows={15} />;
    }

    return (
        <div className="w-full bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg overflow-x-auto min-w-[700px]">
            <TableHeader
                currentSortField={currentSortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
            />
            <div className="overflow-y-auto max-h-[80vh]">
                {sortedData.map((token: Token) => (
                    <TokenRow key={token.id} token={token} />
                ))}
            </div>
        </div>
    );
};
