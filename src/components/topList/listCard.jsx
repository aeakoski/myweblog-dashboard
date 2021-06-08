import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './toplist.css'

const TopList = function({lista}){
  console.log(lista);

  return (
    <div className="statsCard">
      <ol>
      {lista.map((item, index) => (
      <li><span>{item.destination} - {item.visits}</span></li>
      ))}
      </ol>
    </div>
  )
}

export default TopList
