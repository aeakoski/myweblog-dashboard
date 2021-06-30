import logo from './logo.svg';
import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faClock } from '@fortawesome/free-solid-svg-icons'
import {faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import {faMapMarked } from '@fortawesome/free-solid-svg-icons'
import {faRuler } from '@fortawesome/free-solid-svg-icons'

import ReactCardFlip from 'react-card-flip';
import StatCard from './components/statCard/statCard.jsx'
import MemberCard from './components/memberCard/memberCard.jsx'
import TopList from './components/topList/listCard.jsx'

library.add(faClock, faPlaneDeparture, faMapMarked, faRuler)

function App() {
  const [data, setData] = React.useState({})
  const [isFlipped, setFlip] = React.useState(false)


  React.useEffect(()=>{
    fetchData();
    setInterval(()=>{
      var d = new Date();
      if (d.getHours() < 9 || 20 < d.getHours() ) {
        return // Dont update during the night, to save heroku application up-time qouta
      }
      fetchData();
    },1000*60*10) // Fetch every 10:th minute
  }, [])

  React.useEffect(()=>{
    setInterval(() => {
      setFlip(flip => !flip)
    }, 20000)
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
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >
            <StatCard cardStat={(data.totNoFlights)?data.totNoFlights : "-" } iconType={"plane-departure"} unit={"Flygningar"}/>
            <StatCard cardStat={(data.totDistance)?data.totDistance : "-" } iconType={"ruler"} unit={"Flugna Km"}/>
          </ReactCardFlip>
        </div>
        <div class="pane">
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >
            <StatCard cardStat={(data.totNoHours)?data.totNoHours : "-" } iconType={"clock"} unit={"Flygtimmar"} />
            <StatCard cardStat={(data.uniqueNoDestinations)?data.uniqueNoDestinations : "-" } iconType={"map-marked"} unit={"Destinationer"} />
          </ReactCardFlip>
        </div>

    < />
  );
}

export default App;
