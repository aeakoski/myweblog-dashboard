import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './toplist.css'

const TopListAirplanes = function({lista, iconType}){
  let _lista = [{"reg":"SE-TZY", "hours": 0}, {"reg": "SE-MMB", "hours": 13}, {"reg": "SE-MMC", "hours": 14}, {"reg": "SE-MLT", "hours": 15}, {"reg": "SE-URG", "hours": 16}]
  // TODO sort lista with respect to airtime
  // TODO Make it so that the longest airbonre is allways 100% with and the other once are calculated from that
  // TODO make front look like an arrow

  return (
    <div className="statsCard">
    <div className="icon">
      <FontAwesomeIcon icon={iconType} />
    </div>

    <ol>
    {_lista.map((item, index) => (
    <li>
      <span className="progress-bar" style={{width: (item.hours/200).toString()+"%"}}>
          {item.["reg"]} - {item.["hours"]}h
      </span>
      <span className="plane-icon">
        <FontAwesomeIcon className="counterIcon" icon={"plane"}/>
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
