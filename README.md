# Real-Time Token Intelligence Platform (Axiom Pulse Clone)

> A Master-Level Capstone Project implementing a high-performance, real-time crypto trading interface with atomic architecture, sub-millisecond updates, and virtualization for large datasets.

![Project Demo](public/demo-screenshot.png) ## 🚀 Live Demo
- **Deployment:** [Vercel Link](https://realtime-token-intelligence-platfor.vercel.app/)
- **Video Demo:** [YouTube Link Here]

## 🛠 Technical Stack
- **Core:** Next.js 16 (App Router), TypeScript (Strict Mode)
- **Styling:** Tailwind CSS, ShadCN/UI (Radix Primitives)
- **State Management:** Redux Toolkit (Global UI State), React Query (Server State/Caching)
- **Performance:** TanStack Virtual (Virtualization), Recharts (Visualization)
- **Testing:** Storybook, Chromatic (Visual Regression)

## ✨ Key Features
1. **Real-Time WebSocket Emulation:** Prices stream via a custom hook with <100ms latency updates.
2. **Visual Data Intelligence:**
   - **Sparklines:** 7-day price trend visualization.
   - **Flash Updates:** Smooth color transitions (Green/Red) on price tick.
   - **Status Indicators:** Tooltips and colored badges for token lifecycle status.
3. **Advanced Performance:**
   - **Virtualization:** Handles 500+ rows with zero layout shift using `useVirtualizer`.
   - **Optimization:** 97/100 Mobile Lighthouse Performance Score.
4. **Interactive UI:**
   - **Filtering:** Category tabs (New Pairs, Final Stretch, Migrated).
   - **Sorting:** Multi-column sorting via Redux.
   - **Drill-down:** Detailed modal view on row click.

## 🏗 Architecture
This project follows **Atomic Design** principles:
- **Atoms:** `Sparkline`, `PriceChangeIndicator`
- **Molecules:** `TokenRow`, `CategoryTabs`, `StatusBadge`
- **Organisms:** `TokenTradingTable`, `TokenDetailModal`
- **Templates:** `Providers`

## 🧪 Testing & QA
Visual regression testing is implemented using **Storybook** and **Chromatic**.
```bash
# Run Storybook locally
npm run storybook

# Run Visual Regression Test (Requires Token)
npm run chromatic