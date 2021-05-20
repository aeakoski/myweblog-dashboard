import logo from './logo.svg';
import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faClock } from '@fortawesome/free-solid-svg-icons'
import {faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import StatCard from './components/statCard/statCard.jsx'
import MemberCard from './components/memberCard/memberCard.jsx'

library.add(faClock, faPlaneDeparture)

function App() {
  const [data, setData] = React.useState({})

  React.useEffect(()=>{
    fetch("stats").then(x=>x.json()).then(
      (res)=>{
          setData(res);
          console.log(res.totNoFlights);
          console.log(res.totNoHours);
          console.log(res.totNoPilots);
      }
    )
    .catch(console.error)

  }, [])

  return (
    < >

        <div class="pane">
          <MemberCard cardStat={(data.totNoPilots)?data.totNoPilots : "-" }/>
        </div>
        <div class="pane">
          <StatCard cardStat={(data.totNoFlights)?data.totNoFlights : "-" } iconType={"plane-departure"} unit={"Flygningar"}/>
        </div>
        <div class="pane">
          <StatCard cardStat={(data.totNoHours)?data.totNoHours : "-" } iconType={"clock"} unit={"Flygtimmar"} />
        </div>


    < />
  );
}

export default App;
