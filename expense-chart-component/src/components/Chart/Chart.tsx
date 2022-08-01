import './style.css';
import ChartBar from '@/components/ChartBar';
import { useMemo } from 'react';

interface ChartProps {
    data: Array<{
        day: string;
        amount: number;
    }>;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const maxDataValue = useMemo(() => {
        return getMaxDataValue(data);
    }, [data]);

    return (
        <div className='chart'>
            <h3>Spending - Last 7 days</h3>
            <div className='chart-bars-container'>
                {data.map((dayData, index) => (
                    <ChartBar
                        key={index}
                        day={dayData.day}
                        value={dayData.amount}
                        selected={todayIndex === index}
                        maxValue={maxDataValue}
                    />
                ))}
            </div>

            <div className='divider' />

            <div className='chart-total-container'>
                <div className='chart-total-container__left'>
                    <h6 className='text-secondary'>Total this month</h6>
                    <h2 className='text-bold'>$478.33</h2>
                </div>
                <div className='chart-total-container__right'>
                    <h6 className='text-bold'>+2.4%</h6>
                    <h6 className='text-secondary'>from last month</h6>
                </div>
            </div>
        </div>
    );
};

const todayIndex = new Date().getDay();

const getMaxDataValue = (data: ChartProps['data']): number => {
    return data.reduce((prev, cur) => {
        if (cur.amount > prev) {
            return cur.amount;
        }

        return prev;
    }, -1);
};

export { Chart };
