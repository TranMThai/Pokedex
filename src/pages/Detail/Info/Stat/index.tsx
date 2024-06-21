import React, { useEffect, useState } from 'react'
import Pokemon from '../../../../types/Pokemon'
import axios from 'axios'
import './style.scss'
import Type from '../../../../types/Type'
import { colorType } from '../../../../utils/PokemonUtils'
import Icon from '../../../../assets/icons'

interface IProps {
    pokemon: Pokemon
}

const Stat: React.FC<IProps> = ({ pokemon }) => {


    return (
        <section className='stat'>
            Stat
        </section>
    )

}

export default Stat