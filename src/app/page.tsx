// src/app/page.tsx (UPDATED)
import { TokenTradingTable } from '@/components/organisms/TokenTradingTable';
import { TokenDetailModal } from '@/components/organisms/TokenDetailModal'; // NEW IMPORT
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-12">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Axiom Pulse Clone (Master Project)
      </h1>
      <TokenTradingTable />
      {/* 💡 Include the Modal here so it can listen to Redux state */}
      <TokenDetailModal />
    </div>
  );
}