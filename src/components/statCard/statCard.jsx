import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './card.css'

const CardStat = function({cardStat, iconType, unit}){


  return (
    <div className="statsCard">
      <FontAwesomeIcon icon={iconType} />

      <div className="cardText">
        <span className="data" >{cardStat}</span>
        <span className="unit">{unit}</span>
        <i><span className="desc">fr. flygplatser i hela Sverige, 2021</span></i>
      </div>
    </div>
  )
}

export default CardStat
