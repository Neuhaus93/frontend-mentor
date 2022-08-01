import React from 'react';
import Logo from '@/components/Logo';
import './style.css';

const Balance: React.FC = () => {
    return (
        <div className='balance'>
            <div>
                <h6>My balance</h6>
                <h3>R$921.48</h3>
            </div>
            <Logo />
        </div>
    );
};

export { Balance };
