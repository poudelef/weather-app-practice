const request = require('request')

const forecast = (lati,longi,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f8546b1247da1459966bcab8ecf025e6&query='+lati +','+longi
    request({uri:url,json:true}, (error, {body})=> {
        if(error){
            callback('Unable to load the data', undefined)
        }
        else if(body.error){
            callback('Unable to find the loation', undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is now ' + body.current.temperature + 'C and wind speed is '+ body.current.wind_speed +'.')
        }
    })
} 

module.exports = forecast