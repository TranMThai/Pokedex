import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pokemon from '../../types/Pokemon'
import api from '../../api/api'
import './style.scss'
import { backGroundColorType } from '../../utils/PokemonUtils'
import About from './Info/About'
import Evolution from './Info/Evolution'
import Stat from './Info/Stat'

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
    const type1: string = pokemon.types[0].type.name
    const type2: string | undefined = pokemon.types[1]?.type.name
    const color = backGroundColorType.get(type1 === 'normal' && type2 ? type2 : type1)

    return (
      <div className='pokemon-detail'>
        <div className='basic-info' style={{ backgroundColor: color }}>
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
            <button className='stat-button button-page' onClick={(e) => pageHandle(e, 1)}>Stat</button>
            <button className='evolution-button button-page' onClick={(e) => pageHandle(e, 2)}>Evolution</button>
          </div>
          <div className='section-info'>
            {pageInfo === 0 &&
              <About
                pokemon={pokemon}
              />
            }
            {pageInfo === 1 &&
              <Stat
                pokemon={pokemon}
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