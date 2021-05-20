import React from 'react'
import './card.css'

const MemberCard = function({cardStat}){

  return (
    <div className="statsCard">
      <img src="osfklogoblack.png"></img>

      <div className="cardText">
        <span className="data" >{cardStat}</span>
        <span className="unit">Medlemmar</span>
        <i><span className="desc">har flugit i år</span></i>
      </div>
    </div>
  )
}

export default MemberCard
