
const request = require("request")

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1Ijoic2FtYmhhdjA4OTciLCJhIjoiY2x2emkxYjM4MzRpeTJrbXg2bGZ6NDdpdCJ9.s8O0luk-bs5LZbBZAxFeeQ&limit=1'
    request({uri:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to loaction.', undefined) 
        }else if(response.body.features.length === 0){
            callback('Unable to find location. ',undefined)
        }else{
            callback(undefined, {
                latitude : response.body.features[0].properties.coordinates.latitude,
                longitude : response.body.features[0].properties.coordinates.longitude,
                location: response.body.features[0].properties.full_address
            })
        }
        
    })
}

module.exports = geocode