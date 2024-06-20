import React from 'react'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const {name} = useParams()
  return (
    <div>Pokemon {name}</div>
  )
}
export default Detail