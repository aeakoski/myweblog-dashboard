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
import {faMedal } from '@fortawesome/free-solid-svg-icons'
import {faPlane } from '@fortawesome/free-solid-svg-icons'

import ReactCardFlip from 'react-card-flip';
import StatCard from './components/statCard/statCard.jsx'
import PictureStatCard from './components/pictureStatCard/pictureStatCard.jsx'
import TopList from './components/topList/listCard.jsx'
import TopListAirplanes from './components/topListAirplanes/listCard.jsx'

library.add(faClock, faPlaneDeparture, faMapMarked, faRuler, faMedal, faPlane)

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
    },1000*60*180) // Fetch every 180:th minute
  }, [])

  React.useEffect(()=>{
    setInterval(() => {
      setFlip(flip => !flip)
    }, 1000*20)
  }, [])

  const fetchData = () => {
    let baseUrl = ""

    // Figure out if in dev or prod and set base url to api accordingly
    if (window.location.href.includes("localhost:3000")) {
      baseUrl = "http://localhost:8889/"
    }

    fetch(baseUrl + "stats").then(x=>x.json()).then(
      (res)=>{
        console.log("Fetching finished")

        if (data.bootTime && res.bootTime) {
          if (data.bootTime < res.bootTime){
            console.log("REloading!");
            window.location.reload();
          }
        }

        setData(res);
        console.log(res.totNoFlights);
        console.log(res.totNoHours);
        console.log(res.totNoPilots);
        console.log(res.bootTime);
        console.log(res.topFiveDestinations);
        console.log(res.airplanes);

      }
    )
    .catch(console.error)
  }
// TODO: Put back <StatCard cardStat={(data.totDistance)?data.totDistance : "-" } iconType={"ruler"} unit={"Kilometer"}/>

/*
<ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >

  <StatCard cardStat={(data.totNoHours)?data.totNoHours : "-" } iconType={"clock"} unit={"Flygtimmar"} description="fr. flygplatser i hela Sverige, i år"/>
  <TopList lista={(data.topFiveDestinations)?data.topFiveDestinations : [] } iconType={"map-marked"} />
</ReactCardFlip>

*/


  return (
    < >
      <div className="pane">
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >
          <PictureStatCard cardStat={(data.totNoPilots)?data.totNoPilots : "-" } picture="osfklogoblack.png" unit="Medlemmar" description="har flugit i år"/>
          <PictureStatCard cardStat={(data.uniqueNoDestinations)?data.uniqueNoDestinations : "-" } picture="flygfallt.png" unit="Destinationer" description="besökta av klubbmedlemmar, i år" />
        </ReactCardFlip>
      </div>


      <div className="pane">
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >
          <StatCard cardStat={(data.totNoFlights)?data.totNoFlights : "-" } iconType={"plane-departure"} unit={"Flygningar"} description="fr. flygplatser i hela Sverige, i år"/>
          <StatCard cardStat={(data.totNoHours)?data.totNoHours : "-" } iconType={"clock"} unit={"Flygtimmar"} description="fr. flygplatser i hela Sverige, i år"/>
        </ReactCardFlip>
      </div>

      <div className="pane">
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >
          <TopList lista={(data.topFiveDestinations)?data.topFiveDestinations : [] } iconType={"map-marked"} />
          <TopListAirplanes airplanes={(data.airplanes)?data.airplanes : {} } iconType={"plane"} />
        </ReactCardFlip>
      </div>




    < />
  );
}
export default App;
