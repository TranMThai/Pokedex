import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon from '../../types/Pokemon'
import api from '../../api/api'
import './style.scss'
import { backGroundColorType, colorType, maxStat } from '../../utils/PokemonUtils'
import About from './Info/About'
import Evolution from './Info/Evolution'
import Stats from './Info/Stats'
import Icon from '../../assets/icons'

const Detail = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pageInfo, setPageInfo] = useState<number>(0)

  useEffect(() => {
    const getPokemon = async () => {
      const res = await api.get(`pokemon/${name}`)
      setPokemon(res.data)
    }
    getPokemon()
  }, [])

  const pageHandle = (e: React.MouseEvent, page: number) => {
    setPageInfo(page)
    const buttons = document.querySelectorAll(".button-page") as NodeListOf<HTMLButtonElement>
    buttons.forEach(b => {
      b.classList.remove("choose-page")
    })
    const target = e.target as HTMLButtonElement
    target.classList.add("choose-page")
  }

  if (pokemon) {

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

    const type1: string = pokemon.types[0].type.name
    const type2: string | undefined = pokemon.types[1]?.type.name
    const color = backGroundColorType.get(type1 === 'normal' && type2 ? type2 : type1)

    return (
      <div className='pokemon-detail'>
        <div className='basic-info' style={{ backgroundColor: color }}>
          <div className='types'>
            {pokemon.types.map(t => (
              <span key={t.slot} style={{ backgroundColor: colorType.get(t.type.name) }}>
                <img src={Icon[t.type.name]} alt="" />
                {t.type.name}
              </span>
            ))}
          </div>
          <div className='image-container'>
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon" />
          </div>
          <div className='id-name'>
            <p className='id'>No.{pokemon.id}</p>
            <p className='name'>{pokemon.name}</p>
          </div>
        </div>
        <div className='additional-info' style={{ color: color }}>
          <div className='select'>
            <button className='about-button button-page choose-page' onClick={(e) => pageHandle(e, 0)}>About</button>
            <button className='stat-button button-page' onClick={(e) => pageHandle(e, 1)}>Stats</button>
            <button className='evolution-button button-page' onClick={(e) => pageHandle(e, 2)}>Evolution</button>
          </div>
          <div className='section-info'>
            {pageInfo === 0 &&
              <About
                pokemon={pokemon}
              />
            }
            {pageInfo === 1 &&
              <Stats
                pokemon={pokemon}
                color={color}
                stats={stats}
              />
            }
            {pageInfo === 2 &&
              <Evolution
                pokemon={pokemon}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Detail