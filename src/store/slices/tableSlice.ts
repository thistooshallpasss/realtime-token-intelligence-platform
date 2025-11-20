// src/store/slices/tableSlice.ts (Updated)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortField, TokenStatus } from '@/types/token'; // Assuming TokenStatus is exported

type FilterStatus = TokenStatus | 'All';

interface TableState {
    currentSortField: SortField | null;
    sortDirection: 'asc' | 'desc';
    activeTokenModalId: string | null;
    // 💡 NEW: Filtering State
    filterStatus: FilterStatus;
}

const initialState: TableState = {
    currentSortField: 'marketCap',
    sortDirection: 'desc',
    activeTokenModalId: null,
    // 💡 Initialize filter
    filterStatus: 'All',
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
        // 💡 NEW REDUCER: Set the active filter status
        setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
            state.filterStatus = action.payload;
        },
    },
});

export const { setSort, openTokenModal, closeTokenModal, setFilterStatus } = tableSlice.actions;
export default tableSlice.reducer;