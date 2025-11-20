'use client';

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-3 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
                        aria-label="Close Modal"   // ♿ ACCESSIBILITY FIX
                    >
                        &times;
                    </button>
                </div>

                <div className="py-4">
                    {children}
                </div>
            </div>
        </div>
    );
};
