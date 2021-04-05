
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs')
const https = require('https')
const app = express();
const { Headers } = require('node-fetch')

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
    let pilots = new Map()

    const data = await getData()
    totNoFlights = data.result.FlightLog.reduce((tot, x) => tot += parseInt(x.flights), 0)
    totNoHours = parseInt(data.result.FlightLog.reduce((tot, x) => tot += parseFloat(x.airborne_total), 0))
    data.result.FlightLog.forEach((x) => {pilots.set(x.fullname, 1)})
    totNoPilots = [...pilots.keys()].length
    console.log("Total Hours: " + totNoHours)
    console.log("Total Flights: " + totNoFlights)
    console.log("Total Pilots: " + totNoPilots)
}

var date = "-"
var totNoHours = "-"
var totNoFlights = "-"
var totNoPilots = "-"

updateFlightData()
setInterval(updateFlightData, 5*60*1000); // 5th min

app.get('/', async (req, res) => {

    res.set("Access-Control-Allow-Origin", "*")
    res.send(
      {
        "totNoFlights":totNoFlights,
        "totNoHours":totNoHours,
        "totNoPilots":totNoPilots,
        "date": date
      }
    );
});


https.createServer({
    key: fs.readFileSync('domain.key'),
    cert: fs.readFileSync('domain.crt')
}, app)
    .listen(8889, function () {
        console.log('Example app listening on port 8889! Go to https://localhost:8889/')
    })
