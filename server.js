
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs')
const http = require('http')
const app = express();
const path = require('path');
const { Headers } = require('node-fetch')

const PORT = process.env.PORT || 8889;

const getData = () => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
    myHeaders.append("Cookie", "mwl_cookie_language=se")

    let urlencoded = new URLSearchParams()
    urlencoded.append("qtype", "GetFlightLog")
    urlencoded.append("mwl_u", process.env.MYWEBLOG_SYSTEM_USER)
    urlencoded.append("mwl_p", process.env.MYWEBLOG_SYSTEM_PASSWORD)
    urlencoded.append("app_token", process.env.MYWEBLOG_TOKEN)
    urlencoded.append("returnType", "JSON")
    urlencoded.append("from_date", "2021-01-01")
    urlencoded.append("limit", "10000")

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log(today);
    date = today
    urlencoded.append("to_date", today);

    //console.log(urlencoded)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch("https://api.myweblog.se/api_mobile.php?version=2.0.3", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

}

const updateFlightData = async () => {
    const data = await getData()

    totNoFlights = data.result.FlightLog.reduce((tot, x) => tot += parseInt(x.flights), 0)

    totNoHours = parseInt(data.result.FlightLog.reduce((tot, x) => tot += parseFloat(x.airborne_total), 0))

    totDistance = data.result.FlightLog.reduce((tot, x) => tot += (x.distance) ? parseInt(x.distance) : 0, 0)

    let destinations = new Map()
    data.result.FlightLog.forEach((x) => {
      if ((x.departure == "ESSZ") || (x.departure == "NYCKELSJÖN") || (x.departure == "ESSU") ) { return; }

      if(destinations.get(x.departure) > 0){
        destinations.set(x.departure, destinations.get(x.departure) + 1)
      } else {
        destinations.set(x.departure, 1)
      }
    })
    uniqueNoDestinations = [...destinations.keys()].length +1 // The additional one is for visiting ESSU

    destinationList = [...destinations.keys()].sort((a, b)=>{
      if (destinations.get(a) < destinations.get(b)){ return 1 }
      if (destinations.get(b) < destinations.get(a)){ return -1 }
    })
    destinationList.forEach((item, i) => {
      destinationList[i] = {
        "destination": item,
        "visits": destinations.get(item)
      }
    });


    let pilots = new Map()
    data.result.FlightLog.forEach((x) => {pilots.set(x.fullname, 1)})
    totNoPilots = [...pilots.keys()].length


    console.log("Total Hours: " + totNoHours)
    console.log("Total Flights: " + totNoFlights)
    console.log("Total Pilots: " + totNoPilots)
    console.log("Total Destinations: " + uniqueNoDestinations)
    console.log("Total Distance: " + totDistance)
    console.log(destinationList.slice(0,5))

    //console.log(data.result.FlightLog[0]);
}

var date = "-"
var totNoHours = "-"
var totNoFlights = "-"
var totNoPilots = "-"

updateFlightData()
setInterval(updateFlightData, 5*60*1000); // 5th min



app.get('/stats', async (req, res) => {

    res.set("Access-Control-Allow-Origin", "*")
    res.send(
      {
        "totNoFlights":totNoFlights,
        "totNoHours":totNoHours,
        "totNoPilots":totNoPilots,
        "uniqueNoDestinations": uniqueNoDestinations,
        "topFiveDestinations" : destinationList.slice(0,5),
        "date": date
      }
    );
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

http.createServer(app)
    .listen(PORT, function () {
        console.log('Example app listening on port 8889! Go to http://localhost:'+PORT+'/')
    })
