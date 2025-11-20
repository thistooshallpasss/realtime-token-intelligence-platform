// src/components/atoms/Sparkline.tsx
import React from 'react';
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

// Use React.memo for high performance (crucial atom)
export const Sparkline: React.FC<SparklineProps> = React.memo(({ data, isPositive }) => {
    const chartData = formatData(data);

    // Set the color based on the 24H change (passed as isPositive)
    const chartColor = isPositive ? '#22c55e' : '#ef4444'; // Tailwind green-500 or red-500

    return (
        <div className="w-16 h-8 -my-2"> {/* Fixed small size for the cell */}
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        {/* Gradient definition for better visual appeal */}
                        <linearGradient id={`colorPrice-${chartColor}`} x1="0" y1="0" x2="0" y2="1">
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
                        fill={`url(#colorPrice-${chartColor})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
});

Sparkline.displayName = 'Sparkline';