import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './card.css'

const CardStat = function({cardStat, iconType, unit}){


  return (
    <div className="statsCard">
      <div className="icon">
        <FontAwesomeIcon icon={iconType} />
      </div>
      <div className="cardData">
        <span className="data" >{cardStat}</span>
      </div>
      <div className="cardText">
        <span className="unit">{unit}</span>
        <i><span className="desc">fr. flygplatser i hela Sverige, 2021</span></i>
      </div>
    </div>
  )
}

export default CardStat
