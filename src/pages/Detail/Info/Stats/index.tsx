import React from 'react';
import './style.scss';

interface IProps {
    color?: string;
    stats: { name: string, value: number, max: number }[]
}

const Stats: React.FC<IProps> = ({ color, stats }) => {

    return (
        <section className='stats'>
            <strong>Base stats</strong>
            <div className='stats-list'>
                {stats.map(stat => (
                    <div key={stat.name} className='stat'>
                        <span className='stat-name'>{stat.name}</span>
                        <span className='stat-value'>{stat.value}</span>
                        <div className='stat-bar'>
                            <div
                                className='stat-bar-inner'
                                style={{ width: `${(stat.value / stat.max) * 100}%`, backgroundColor: color }}
                            ></div>
                        </div>
                        <span className='stat-max'>{stat.max}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
