import { useMemo, useState } from 'react';
import './style.css';

interface ChartBarProps {
    day: string;
    value: number;
    maxValue: number;
    selected: boolean;
}

const ChartBar: React.FC<ChartBarProps> = (props) => {
    const { day, value, maxValue, selected } = props;
    const [hovered, setHovered] = useState(false);

    const height = useMemo(() => {
        return (value / maxValue) * MAX_BAR_HEIGHT;
    }, []);

    return (
        <div className='chart-bar'>
            <div
                className='chart-bar__value'
                style={{ opacity: hovered ? 1 : 0 }}>
                <h6>{`$${value}`}</h6>
            </div>
            <div
                className={`chart-bar__bar ${selected ? 'selected' : ''}`}
                style={{ height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            />
            <p>{day}</p>
        </div>
    );
};

const MAX_BAR_HEIGHT = 125;

export { ChartBar };
