//  Setup empty JS object to act as endpoint for all routes
const projectData = {
    date: '',
    temp: '',
    feeling: ''
};
// API info..

//  Require Express to run server and routes
const express = require('express');
//  Start up an instance of app
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
/* Middleware*/

//  Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Cors for cross origin allowance
app.use(cors());

//  Initialize the main project folder
app.use(express.static('website'));

//  Setup Server
app.get('/getData', (req, res) => {
    res.send(JSON.stringify(projectData));
});
app.post('/setData', (req, res) => {
    let data = (req.body);
    console.log(data);
    projectData.temp=data.temp;
    projectData.date=data.date;
    projectData.feeling=data.feeling;
    projectData.city=data.city;
    //res.redirect('/');
    res.send(JSON.stringify(projectData));
});


//  Runing Server... 
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));