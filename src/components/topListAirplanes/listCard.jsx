import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './toplist.css'

const TopListAirplanes = function({airplanes, iconType}){
  console.log(airplanes);
  let MAX_HOURS = 500

  let a = Object.keys(airplanes).map((airplane)=>{
    const container = {}
    container["reg"] = airplane
    container["hours"] = Math.round(airplanes[airplane].hours)
    return container
  })

  let _lista = a.sort((x, y)=>(x.hours < y.hours)? 1: -1).slice(0, 5)
  const calculatePlaneMarginPosition = function(hours){
    if (((hours / MAX_HOURS)*100) > 35 ){
      return "35%"
    }
    return ((hours / MAX_HOURS)*100).toString()+"%"
  }
  return (
    <div className="statsCard">
    <div className="icon">
      <FontAwesomeIcon icon={iconType} />
    </div>

    <ol>
    {_lista.map((item, index) => (
    <li>
      <span className="progress-bar">
          {item.["reg"]} - {item.["hours"].toString().padStart(2, '0')}h <FontAwesomeIcon className="counterIcon" icon={"plane"} style={{marginLeft: calculatePlaneMarginPosition(item.hours)}}/>
      </span>
      <span className="plane-icon">
      </span>
    </li>
    ))}
    </ol>

    <div className="cardText">
      <span className="unit">Flygtid</span>
      <i><span className="desc">per flygplan</span></i>
    </div>
    </div>
  )
}

export default TopListAirplanes
