// src/components/atoms/Sparkline.tsx
import React, { useId } from 'react'; // 💡 NEW: useId import
import {
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts';

interface SparklineProps {
    data: number[];
    isPositive: boolean;
}

// Convert number array to object array format required by Recharts
const formatData = (data: number[]) => {
    return data.map((price, index) => ({
        name: `Day ${index}`,
        price: price,
    }));
};

// 💡 FIX #8: Use a more granular memoization check
export const Sparkline: React.FC<SparklineProps> = React.memo(({ data, isPositive }) => {
    const chartData = formatData(data);
    const chartColor = isPositive ? '#22c55e' : '#ef4444'; // Tailwind green/red
    const uid = useId(); // 💡 FIX #2: Generate unique ID

    return (
        <div className="w-16 h-8 -my-2">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        {/* 💡 FIX #2: Use unique ID for the gradient */}
                        <linearGradient id={`colorPrice-${uid}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={chartColor}
                        fillOpacity={1}
                        strokeWidth={1.5}
                        dot={false}
                        // 💡 FIX #2: Reference the unique gradient ID
                        fill={`url(#colorPrice-${uid})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
},
    // 💡 FIX #8: Custom memo function to prevent re-render on price changes
    (prev, next) => {
        // Only re-render if the historical data or positive status changes.
        return prev.data === next.data && prev.isPositive === next.isPositive;
    });

Sparkline.displayName = 'Sparkline';
