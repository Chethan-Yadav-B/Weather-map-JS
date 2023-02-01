function getLocation(){

    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(async position=>{  //function as a parameter hence getcurrentposition is higher order function
         const lat=position.coords.latitude;
         const long=position.coords.longitude;
         console.log("lat:"+lat+ " "+"long:"+long );
        const data=await getWeatherData(lat,long);
        renderWeatherData(data);
        var map = L.map('map').setView([20.9716, 80.5947], 5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
            maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker=L.marker([lat,long]).addTo(map);
marker.bindPopup(data.name).openPopup();

map.on('click',async function(e){

    console.log("lat:"+e.latlng.lat+"long:"+e.latlang.lng);
    const data=await getWeatherData(e.latlng.lat,e.latlng.lng);
    renderWeatherData(data);
}) 



     })
    }
 
 }
 async function getWeatherData(lat,long){ 

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
 
    let response = await fetch(api);
           let data = await response.json();
    
           console.log(data);
           return data;
}

function renderWeatherData(data){
document.getElementById("city-name").innerHTML=data.name;
document.getElementById("temp").innerHTML=data.main.temp;
document.getElementById("temp-max").innerHTML=data.main.temp_max;
}

const myCallback=() =>{
    console.log("i am sleeping");
}
setTimeout(myCallback,5000);  //function passed as argument so settimeout is higher order function 
 getLocation();
 
 