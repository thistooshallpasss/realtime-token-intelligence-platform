// src/components/organisms/TokenDetailModal.tsx
'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { closeTokenModal } from '@/store/slices/tableSlice';
import { Modal } from '@/components/ui/Modal';
import { useTokenData } from '@/lib/hooks/useTokenData'; // To get token details

export const TokenDetailModal: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const activeTokenId = useSelector((state: RootState) => state.table.activeTokenModalId);

    // Fetch current token list (using data from React Query cache)
    const { data: tokens } = useTokenData();

    const token = tokens?.find(t => t.id === activeTokenId);

    const isOpen = !!token;

    const handleClose = () => {
        dispatch(closeTokenModal());
    };

    if (!isOpen || !token) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={`${token.name} (${token.symbol})`}
        >
            <div className="space-y-3 text-sm">
                <p><strong>Current Price:</strong> ${token.currentPrice.toFixed(2)}</p>
                <p><strong>24H Change:</strong> <span className={token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}>{token.priceChange24h.toFixed(2)}%</span></p>
                <p><strong>Market Cap:</strong> ${new Intl.NumberFormat('en-US').format(token.marketCap)}</p>
                <p><strong>Liquidity:</strong> ${new Intl.NumberFormat('en-US').format(token.liquidity)}</p>
                <p><strong>Volume (24H):</strong> ${new Intl.NumberFormat('en-US').format(token.volume24h)}</p>
                <p><strong>Status:</strong> {token.status}</p>
                {/* Placeholder for Sparkline Chart (Recharts) */}
                <div className="mt-4 p-2 bg-zinc-100 dark:bg-zinc-800 rounded">
                    <p className="text-xs text-center text-gray-500">7-Day Price History (Sparkline Placeholder)</p>
                </div>
            </div>
        </Modal>
    );
};