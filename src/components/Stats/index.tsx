import React from 'react';
import './style.scss';
import Pokemon from '../../types/Pokemon';
import { maxStat } from '../../constants/pokemonConstants';

interface IProps {
    pokemon: Pokemon;
    color?: string;
}

const Stats: React.FC<IProps> = ({ pokemon, color }) => {

    const stats = [
        { name: 'hp', value: pokemon.stats[0].base_stat, max: maxStat.hp },
        { name: 'atk', value: pokemon.stats[1].base_stat, max: maxStat.atk },
        { name: 'def', value: pokemon.stats[2].base_stat, max: maxStat.def },
        { name: 'sp_atk', value: pokemon.stats[3].base_stat, max: maxStat.sp_atk },
        { name: 'sp_def', value: pokemon.stats[4].base_stat, max: maxStat.sp_def },
        { name: 'spe', value: pokemon.stats[5].base_stat, max: maxStat.spe },
    ];
    const totalStats = stats.reduce((total, stat) => total + stat.value, 0)
    // const totalMaxStats = stats.reduce((total, stat) => total + maxStat[stat.name], 0)
    stats.push({ name: 'Total', value: totalStats, max: 780 })

    return (
        <section className='stats' >
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
        </section >
    );
};

export default Stats;
