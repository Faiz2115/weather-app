const weatherLocation = document.querySelector("#weatherLocation");
const locat = document.querySelector(".location");
const temperature = document.querySelector(".temperature");
const conditions = document.querySelector(".conditons");
const wIcon = document.querySelector('.weatherIcon');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const day = document.querySelector('.day');

weatherLocation.addEventListener('keyup', (event) => 
{

    if (event.keyCode === 13) 
    {


        let mainloc = weatherLocation.value;

        let api = "https://api.openweathermap.org/data/2.5/weather?q=" + mainloc + "&appid=1ae0edb29a2d8b8b5b1d070ac6de57d7&units=metric";



        fetch(api)
            .then(response => {
                if (response.ok)
                    return response.json()
                else if (response.status === 404) {
                    alert('Enter Valid Location');
                    weatherLocation.value = " ";

                }
            })
            .then(data =>
            {
                console.log(data);
                let dataName = data.name;
                let dataTemp = data.main.feels_like;
                let dataCond = data.weather[0].description;
                let dataIcon = data.weather[0].icon;
                let imageURL = "http://openweathermap.org/img/wn/" + dataIcon + "@2x.png";
                locat.textContent = dataName;
                temperature.textContent = dataTemp + "° C";
                conditions.textContent = dataCond.toUpperCase();
                wIcon.src = imageURL;
                weatherLocation.value = " ";


            });

    }

});

addEventListener('load', () => 
{
   
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        alert("not Available");
    }
    timeDate();
});

function showPosition(position) 
{
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    


    let api = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=1ae0edb29a2d8b8b5b1d070ac6de57d7&units=metric";

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data =>
             {
            console.log(data);            
            let dataName = data.name;
            let dataTemp = data.main.feels_like;
            let dataCond = data.weather[0].description;
            let dataIcon = data.weather[0].icon;
            let imageURL = "http://openweathermap.org/img/wn/" + dataIcon + "@2x.png";

            locat.textContent = dataName;
            temperature.textContent = dataTemp + 
            "° C";
            conditions.textContent = dataCond.toUpperCase();
            weatherLocation.textContent = " ";
            wIcon.src = imageURL;
            

        })



}

function showError(error)
 {
    switch(error.code)
     {
      case error.PERMISSION_DENIED:
       alert("Unable To Get The Location Please Write the Location Manually.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Unable To Get The Location Please Write the Location Manually.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }



function timeDate()
{
    var da = new Date();
   var t=da.toLocaleTimeString();
   var dastr=da.toLocaleDateString();
   var d=da.getDay();
   var sec=da.getSeconds();
   var ds=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    setTimeout(timeDate,1000);
    time.textContent=t;
    date.textContent=dastr;
    day.textContent=ds[d];

}