import React from 'react'
import './card.css'

const PictureStatCard = function({cardStat, picture, unit, description}){



  return (
    <div className="statsCard">
    <div className="icon">
      <img src={picture}></img>
    </div>
    <div className="cardData">
      <span className="data" >{cardStat}</span>
    </div>
    <div className="cardText">
      <span className="unit">{unit}</span>
      <i><span className="desc">{description}</span></i>
    </div>
    </div>
  )
}

export default PictureStatCard
