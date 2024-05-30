// We used handlelbars to allow us to use dynamic content


const path = require('path');
// We don't need to install 'path' since it is a core Node.js module

const express = require('express');
const { error } = require('console');
const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');

// express is a function
const app = express();

// DEfine path for express config

// Setting up the public directory
const publicDirectoryPath = path.join(__dirname, '../public');

// Setting up Handlebars as the templating engine
const viewsPath = path.join(__dirname, '../templates');

// Path for partials



// Setup handlebars engine and views location
app.set('view engine', 'hbs');

// setting path for haldelbars
// We are pointing Express to our custom dir. 
app.set('views', viewsPath);



// Configuring Express to serve static files from the public directory
// it connects this app.js with the app.js in public folder.
app.use(express.static(publicDirectoryPath));

// Setting up routes
// app.get has 2 argument. 1st is string and 2nd is function
app.get('', (req, res) => {
    res.render('index',{
        title:"Weather App",
        name:'Sambhav Poudel'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Sambhav Poudel"
    })
})

app.get('/help',(req,res)=>{
    res.render("Help",{
        title:"Help needed?",
        name:"Sambhav Poudel"
    })
})

app.get('/weather', (req, res) => {
    // making address as a requiment
    if(!req.query.address){
        return res.send({
            error:"Address is not provided"
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error:"Error occured during geocoding"
            })
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                res.send({
                    error:"Error occured"
                })
            }
            res.send({
                location: req.query.address,
                forecast: forecastData,
            })
        })
    })    

    // res.send({
    //     location: 'Ohio',
    //     forecast: 'Sunny day',
    //     address: req.query.address
    // });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a seach term'
        })
    }
    // we can also do else 
    console.log(req.query)
    res.send({
        products:[]
    })
})


// wild card charater '*'
// app.get('/about/*',(req,res)=>{
//     res.send("About page didn't found")
// })

// app.get('/help/*',(req,res)=>{
//     res.send("Help page didn't found")
// })

app.get('*',(req,res)=>{
    res.render('404',{})
})



// Starting the server on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
