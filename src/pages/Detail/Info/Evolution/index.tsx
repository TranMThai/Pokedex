import React, { useEffect, useState } from 'react'
import Pokemon from '../../../../types/Pokemon'
import './style.scss'

interface IProps {
    pokemon: Pokemon
}

const Evolution: React.FC<IProps> = ({ pokemon }) => {

    return (
        <section className='evolution'>
            Evolution
        </section>
    )
}

export default Evolution