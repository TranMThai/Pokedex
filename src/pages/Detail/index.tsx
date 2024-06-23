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

const Detail: React.FC = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pageInfo, setPageInfo] = useState<number>(0)

  useEffect(() => {
    const getPokemon = async () => {
      const res = await api.get(`pokemon/${name}`)
      setPokemon(res.data)
    }
    getPokemon()
  }, [name])


  const pageHandle = (page: number) => {
    setPageInfo(page);
  };

  if (pokemon) {

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
            <PokemonProvider pokemon={pokemon}>
              {pageInfo === 0 &&
                <About pokemon={pokemon}/>
              }
              {pageInfo === 1 &&
                <Stats
                  pokemon={pokemon}
                  color={color}
                />
              }
              {pageInfo === 2 &&
                <Evolution/>
              }
            </PokemonProvider>
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