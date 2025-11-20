// src/store/slices/tableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortField } from '@/types/token';

interface TableState {
    currentSortField: SortField | null;
    sortDirection: 'asc' | 'desc';
    activeTokenModalId: string | null;
    // Add filters later: filterStatus: TokenStatus[]
}

const initialState: TableState = {
    currentSortField: 'marketCap', // Default sort field
    sortDirection: 'desc',
    activeTokenModalId: null,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<{ field: SortField, direction: 'asc' | 'desc' }>) => {
            state.currentSortField = action.payload.field;
            state.sortDirection = action.payload.direction;
        },
        openTokenModal: (state, action: PayloadAction<string>) => {
            state.activeTokenModalId = action.payload;
        },
        closeTokenModal: (state) => {
            state.activeTokenModalId = null;
        },
    },
});

export const { setSort, openTokenModal, closeTokenModal } = tableSlice.actions;
export default tableSlice.reducer;