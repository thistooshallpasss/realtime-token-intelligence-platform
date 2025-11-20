// src/components/molecules/TokenRow.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'; // 💡 FIX 1: Use correct import
import { TokenRow } from './TokenRow';
import { Token } from '@/types/token';

// 💡 FIX 2: Import Redux Provider and Store for the decorator
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const mockToken: Token = {
    id: 'id-STORY',
    symbol: 'STORY',
    name: 'Storybook Token',
    currentPrice: 345.67,
    priceChange24h: 4.52,
    volume24h: 89000000,
    liquidity: 150000000,
    status: 'New pairs',
    sparklineData: [10, 20, 15, 25, 30, 28, 35],
    marketCap: 200000000,
};

const meta: Meta<typeof TokenRow> = {
    title: 'Molecules/TokenRow',
    component: TokenRow,
    tags: ['autodocs'],
    // 💡 FIX 2: Wrap the story in the Redux Provider
    decorators: [
        (Story) => (
            <Provider store={store}>
                <div style={{ padding: '20px', maxWidth: '800px' }}>
                    <Story />
                </div>
            </Provider>
        ),
    ],
    args: {
        token: mockToken,
    },
} satisfies Meta<typeof TokenRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DecreasingPrice: Story = {
    args: {
        token: {
            ...mockToken,
            id: 'id-DOWN',
            symbol: 'DOWN',
            priceChange24h: -1.5,
            currentPrice: 123.45,
        }
    }
};