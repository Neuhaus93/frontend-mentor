import { useState } from 'react';
import './App.css';
import Balance from '@/components/Balance';
import Chart from '@/components/Chart';
import data from './data.json';

function App() {
    return (
        <div className='App'>
            <Balance />
            <Chart data={data} />
        </div>
    );
}

export default App;
