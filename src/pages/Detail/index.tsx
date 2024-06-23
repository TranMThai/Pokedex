import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon from '../../types/Pokemon'
import api from '../../api/api'
import './style.scss'
import { backGroundColorType, colorType, maxStat } from '../../constants/pokemonConstants'
import About from './Info/About'
import Evolution from './Info/Evolution'
import Stats from './Info/Stats'
import Icon from '../../assets/icons'
import axios from 'axios'
import Type from '../../types/Type'
import EvolutionChain from '../../types/EvolutionChain'

const Detail: React.FC = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pageInfo, setPageInfo] = useState<number>(0)
  const [species, setSpecies] = useState<PokemonSpecies>()
  const [type, setType] = useState<Type[]>([])
  const [weakness, setWeakness] = useState<string[]>([])
  const [strongness, setStrongness] = useState<string[]>([])
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>()

  useEffect(() => {
    const getPokemon = async () => {
      const res = await api.get(`pokemon/${name}`)
      setPokemon(res.data)
    }
    getPokemon()
  }, [name])


  useEffect(() => {
    if (pokemon) {
      const getPokemonSpecies = async () => {
        const res = await api.get(`pokemon-species/${pokemon.id}`)
        setSpecies(res.data)
      }
      getPokemonSpecies();
    }
  }, [pokemon])

  useEffect(() => {
    if (species) {
      const getEvolutionChain = async () => {
        const res = await axios.get(species.evolution_chain.url)
        setEvolutionChain(res.data)
      }
      getEvolutionChain();
    }
  }, [species])

  useEffect(() => {
    if (species) {
      const getType = async (url: string) => {
        const res = await axios.get(url)
        setType(p => [...p, res.data])
      }
      pokemon?.types.forEach(t => {
        getType(t.type.url)
      })
    }
  }, [species])


  useEffect(() => {
    const weaknesses = new Set(weakness)
    const strongnesses = new Set(strongness)
    type.forEach(t => {

      t.damage_relations.no_damage_to.forEach(d => {
        weaknesses.add(d.name)
      })
      t.damage_relations.double_damage_from.forEach(d => {
        weaknesses.add(d.name)
      })

      t.damage_relations.no_damage_from.forEach(d => {
        strongnesses.add(d.name)
      })
      t.damage_relations.double_damage_to.forEach(d => {
        strongnesses.add(d.name)
      })
    })

    const weaknessesClone = [...weaknesses]
    const strongnessesClone = [...strongnesses]

    setWeakness(weaknessesClone.filter(e => !strongnessesClone.includes(e) && e !== pokemon?.types[0].type.name && e !== pokemon?.types[1]?.type.name))
    setStrongness(strongnessesClone.filter(e => !weaknessesClone.includes(e) && e !== pokemon?.types[0].type.name && e !== pokemon?.types[1]?.type.name))

  }, [type])

  const pageHandle = (page: number) => {
    setPageInfo(page);
  };

  if (pokemon && species && type && weakness && strongness && evolutionChain) {

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
            <button className={`about-button button-page ${pageInfo === 0 ? 'choose-page' : ''}`} onClick={() => pageHandle(0)}>About</button>
            <button className={`stat-button button-page ${pageInfo === 1 ? 'choose-page' : ''}`} onClick={() => pageHandle(1)}>Stats</button>
            <button className={`evolution-button button-page ${pageInfo === 2 ? 'choose-page' : ''}`} onClick={() => pageHandle(2)}>Evolution</button>
          </div>
          <div className='section-info'>
            {pageInfo === 0 &&
              <About
                pokemon={pokemon}
                species={species}
                weakness={weakness}
                strongness={strongness}
              />
            }
            {pageInfo === 1 &&
              <Stats
                color={color}
                stats={stats}
              />
            }
            {pageInfo === 2 &&
              <Evolution
                evolutionChain={evolutionChain}
              />
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>Loading</div>
    )
  }
}
export default Detail