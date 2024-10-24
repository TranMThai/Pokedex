import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon from '../../types/Pokemon'
import api from '../../api/api'
import './style.scss'
import { backGroundColorType, colorType } from '../../constants/pokemonConstants'
import About from '../../components/About'
import Evolution from '../../components/Evolution'
import Stats from '../../components/Stats'
import Icon from '../../assets/icons'
import { PokemonProvider } from '../../contexts/PokemonContext'
import Loading from '../../components/Loading'

export interface IPokemon {
  id: number;
  name: string;
  image: string;
  color: string | undefined;
}

const Detail: React.FC = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pageInfo, setPageInfo] = useState<number>(0)
  const [color, setColor] = useState<string>('#c5c4bc')
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemon = async () => {
      const res = await api.get(`pokemon/${name}`)
      setPokemon(res.data)
    }
    getPokemon()
  }, [name])

  useEffect(() => {
    if (pokemon) {
      const type1: string = pokemon.types[0].type.name
      const type2: string = pokemon.types[1]?.type.name
      setColor(backGroundColorType.get(type1 === 'normal' && type2 ? type2 : type1) ?? '#c5c4bc')
    }
  }, [pokemon])

  return (
    <PokemonProvider pokemon={pokemon} setLoading={setLoading}>
      {pokemon && !loading
        ?
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
              <button className={`about-button button-page ${pageInfo === 0 ? 'choose-page' : ''}`} onClick={() => setPageInfo(0)}>About</button>
              <button className={`stat-button button-page ${pageInfo === 1 ? 'choose-page' : ''}`} onClick={() => setPageInfo(1)}>Stats</button>
              <button className={`evolution-button button-page ${pageInfo === 2 ? 'choose-page' : ''}`} onClick={() => setPageInfo(2)}>Evolution</button>
            </div>
            <div className='section-info'>
              {pageInfo === 0 &&
                <About />
              }
              {pageInfo === 1 &&
                <Stats
                  color={color}
                />
              }
              {pageInfo === 2 &&
                <Evolution />
              }
            </div>
          </div>
        </div>
        :
        <Loading />
      }
    </PokemonProvider>
  )
}
export default Detail