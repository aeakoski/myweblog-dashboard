import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './toplist.css'

const TopList = function({lista, iconType}){
  console.log(lista);


  return (
    <div className="statsCard">
    <FontAwesomeIcon icon={iconType} />
      <ol>
      {lista.map((item, index) => (
      <li><span>{item.visits} st - {item.destination}</span></li>
      ))}
      </ol>
    </div>
  )
}

export default TopList
