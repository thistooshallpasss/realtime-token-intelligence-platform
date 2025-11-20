// src/store/slices/tableSlice.ts (FIXED)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortField, TokenStatus } from '@/types/token';

type FilterStatus = TokenStatus | 'All';

interface TableState {
    // 💡 FIX 1: Allow null for currentSortField
    currentSortField: SortField | null;
    sortDirection: 'asc' | 'desc';
    activeTokenModalId: string | null;
    filterStatus: FilterStatus;
}

const initialState: TableState = {
    currentSortField: 'marketCap',
    sortDirection: 'desc',
    activeTokenModalId: null,
    filterStatus: 'All',
};

// 💡 FIX 2: Define payload type allowing null for field
interface SetSortPayload {
    field: SortField | null;
    direction: 'asc' | 'desc';
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        // 💡 FIX 3: Use SetSortPayload in PayloadAction
        setSort: (state, action: PayloadAction<SetSortPayload>) => {
            state.currentSortField = action.payload.field;
            state.sortDirection = action.payload.direction;
        },
        openTokenModal: (state, action: PayloadAction<string>) => {
            state.activeTokenModalId = action.payload;
        },
        closeTokenModal: (state) => {
            state.activeTokenModalId = null;
        },
        setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
            state.filterStatus = action.payload;
        },
    },
});

export const { setSort, openTokenModal, closeTokenModal, setFilterStatus } = tableSlice.actions;
export default tableSlice.reducer;
