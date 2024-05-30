


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#m1')
const messagetwo = document.querySelector('#m2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
            if(data.error){
                console.log("Error: Unable to find location. Try another search.")
                messageone.textContent = 'Error: Unable to find location. Try another search.'
                messagetwo.textContent = ''
            }else{
                console.log(data.location)
                console.log(data.forecast)
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
            }
    })
   
}) 
})