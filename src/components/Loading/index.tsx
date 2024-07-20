import React from 'react'
import './style.scss'
import Pokeball from '/pokeball.svg'


const Loading: React.FC = () => {

    return (
        <div className="loading-container">
            <span className="loading">
              <img src={Pokeball} alt="Loading" />
            </span>
          </div>
    )
    
}

export default Loading