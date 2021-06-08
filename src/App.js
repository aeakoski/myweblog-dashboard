import logo from './logo.svg';
import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faClock } from '@fortawesome/free-solid-svg-icons'
import {faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import {faMapMarked } from '@fortawesome/free-solid-svg-icons'
import StatCard from './components/statCard/statCard.jsx'
import MemberCard from './components/memberCard/memberCard.jsx'
import TopList from './components/topList/listCard.jsx'

library.add(faClock, faPlaneDeparture, faMapMarked)

function App() {
  const [data, setData] = React.useState({})

  React.useEffect(()=>{
    fetchData();
    setInterval(()=>{
      fetchData();
    },1000*10*60)
  }, [])

  const fetchData = () => {
    fetch("stats").then(x=>x.json()).then(
      (res)=>{
        setData(res);
        console.log(res.totNoFlights);
        console.log(res.totNoHours);
        console.log(res.totNoPilots);
        console.log(res.topFiveDestinations);
      }
    )
    .catch(console.error)
  }



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
        <div class="pane">
          <StatCard cardStat={(data.uniqueNoDestinations)?data.uniqueNoDestinations : "-" } iconType={"map-marked"} unit={"Destinationer"} />
        </div>
        <div class="pane">
          <TopList lista={(data.topFiveDestinations)?data.topFiveDestinations : []} />
        </div>

    < />
  );
}

export default App;
