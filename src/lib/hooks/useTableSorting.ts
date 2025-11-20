// src/lib/hooks/useTableSorting.ts
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setSort } from '@/store/slices/tableSlice';
import { Token, SortField } from '@/types/token';

interface UseSortResult {
    sortedData: Token[];
    currentSortField: SortField | null;
    sortDirection: 'asc' | 'desc';
    handleSort: (field: SortField) => void;
}

export const useTableSorting = (tokens: Token[]): UseSortResult => {
    const dispatch: AppDispatch = useDispatch();
    const { currentSortField, sortDirection } = useSelector((state: RootState) => state.table);

    // Memoize the sorting logic to prevent unnecessary re-calculation on every render
    const sortedData = useMemo(() => {
        if (!currentSortField || tokens.length === 0) {
            return tokens;
        }

        const sorted = [...tokens].sort((a, b) => {
            const aValue = a[currentSortField] as number;
            const bValue = b[currentSortField] as number;

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [tokens, currentSortField, sortDirection]); // Dependencies for re-calculation

    const handleSort = (field: SortField) => {
        let newDirection: 'asc' | 'desc' = 'asc';

        if (currentSortField === field) {
            // Toggle direction if the same field is clicked
            newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // Default to descending for new fields (e.g., higher volume/price first)
            newDirection = 'desc';
        }

        dispatch(setSort({ field, direction: newDirection }));
    };

    return { sortedData, currentSortField, sortDirection, handleSort };
};