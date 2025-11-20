'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setFilterStatus, setSort } from '@/store/slices/tableSlice'; // 💡 Import setSort
import { TokenStatus } from '@/types/token';
import { cn } from '@/lib/utils/cn';

const CATEGORIES: ('All' | TokenStatus)[] = [
    'All',
    'New pairs',
    'Final Stretch',
    'Migrated'
];

export const CategoryTabs: React.FC = () => {
    const dispatch = useDispatch();
    const activeFilter = useSelector((state: RootState) => state.table.filterStatus);

    // 💡 FIX #4: Reset sort whenever the filter changes
    const handleFilterChange = (status: 'All' | TokenStatus) => {
        dispatch(setFilterStatus(status));
        dispatch(setSort({ field: null, direction: 'desc' }));
    };

    return (
        <div className="flex space-x-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg max-w-fit mb-6">
            {CATEGORIES.map((status) => (
                <button
                    key={status}
                    onClick={() => handleFilterChange(status)} // Use the updated handler
                    className={cn(
                        "px-3 py-1 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                        activeFilter === status
                            ? "bg-white text-black dark:bg-blue-600 dark:text-white shadow-md"
                            : "text-gray-600 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    )}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};
