const axios = require('axios')
const express = require('express')
const request = require('request')

const bodyParser = require('body-parser');
const { response } = require('express');
const app = express(); 
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
let clientKey = 'js-ff560554570e49d1e8881ba29e55c15c'

let zipcode;
app.post('/zipcode', (req, res) => {
  zipcode = req.body.Zip
  let url = "https://service.zipapi.us/zipcode/" + zipcode + "?X-API-KEY=" + clientKey + "&fields=geolocation,population";
  console.log(url)
  firstname = req.body.firstname
  console.log(zipcode)
  axios.get(url).then((data) => {
    let city = data.data.data.city;
    let statename = data.data.data.state_fullname;

    res.render('confirmation', { firstName: firstname, statename: statename, City: city });
  })

})
app.get('/', (req, res) => {
  console.log(req.body)
  res.render('index', { data: null });


})


app.get('/test', (req, res) => {
  request(url, (error, response, body) => {
    console.log(response)
    console.log(zipcode)
    let Body = JSON.parse(body)
    if (error) {
      console.log(error)
    } else {
      console.log(Body)
    }
  })
})
app.get('/test2', (req, res) => {
  console.log(res.body)
})



app.listen(3000, () => {
  console.log('Listening on port 3000');

})



