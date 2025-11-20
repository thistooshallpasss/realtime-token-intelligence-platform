'use client';

import React from 'react';
import { useTokenData } from '@/lib/hooks/useTokenData';
import { useTableSorting } from '@/lib/hooks/useTableSorting';
import { TokenRow } from '@/components/molecules/TokenRow';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { Token, SortField } from '@/types/token';
import { cn } from '@/lib/utils/cn';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Redux & Filtering
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CategoryTabs } from '@/components/molecules/CategoryTabs';

// 💡 Virtualizer
import { useVirtualizer } from '@tanstack/react-virtual';

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
}) => (
    <button
        className={cn(
            "flex items-center justify-end gap-1 bg-transparent border-none p-0 " +
            "cursor-pointer hover:text-white transition-colors font-semibold " +
            "text-gray-500 uppercase text-xs",
            className
        )}
        onClick={() => onSort(field)}
        aria-label={`Sort by ${label}`}
    >
        {label}
        {isSorting && (
            direction === 'asc'
                ? <ArrowUp size={14} className="text-blue-400" />
                : <ArrowDown size={14} className="text-blue-400" />
        )}
    </button>
);

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
        <span className="w-[15%] text-right pr-4">Chart (7d)</span>
        <SortableHeaderCell
            field="liquidity"
            label="Liquidity"
            onSort={handleSort}
            isSorting={currentSortField === 'liquidity'}
            direction={sortDirection}
            className="w-[10%]"
        />
        <SortableHeaderCell
            field="volume24h"
            label="Volume (24H)"
            onSort={handleSort}
            isSorting={currentSortField === 'volume24h'}
            direction={sortDirection}
            className="w-[15%]"
        />
        <span className="w-[15%] text-right">Status</span>
    </div>
);

export const TokenTradingTable: React.FC = () => {
    const { data: tokens, isLoading, isError } = useTokenData();
    const filterStatus = useSelector((state: RootState) => state.table.filterStatus);

    const filteredTokens = React.useMemo(() => {
        if (!tokens || filterStatus === 'All') return tokens || [];
        return tokens.filter(token => token.status === filterStatus);
    }, [tokens, filterStatus]);

    const {
        sortedData,
        currentSortField,
        sortDirection,
        handleSort
    } = useTableSorting(filteredTokens);

    // --- Virtualizer ---
    const parentRef = React.useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: sortedData.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 5,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();

    if (isError) return <div className="text-center text-red-500 p-8">Error loading token data.</div>;
    if (isLoading) return <TableSkeleton rows={15} />;

    return (
        <div className="w-full">
            <CategoryTabs />

            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg overflow-x-auto min-w-[700px]">
                <TableHeader
                    currentSortField={currentSortField}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                />

                {/* Virtualized Scroll Container */}
                <div
                    ref={parentRef}
                    className="overflow-y-auto max-h-[80vh]"
                    style={{ height: '80vh' }}
                >
                    <div
                        className="relative w-full"
                        style={{ height: rowVirtualizer.getTotalSize() }}
                    >
                        {/* ✅ Use virtualRows for virtualized mapping */}
                        {virtualRows.map((virtualRow) => {
                            const token = sortedData[virtualRow.index];
                            return (
                                <div
                                    key={virtualRow.key} // Outer div key for virtualization
                                    className="absolute top-0 left-0 w-full relative z-0 hover:z-50"
                                    style={{
                                        height: virtualRow.size,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                >
                                    {/* 💡 FIX #3: Remove key from the inner component */}
                                    <TokenRow token={token} />
                                </div>
                            );
                        })}


                    </div>
                </div>
            </div>
        </div>
    );
};
