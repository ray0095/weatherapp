var sumbitBtn = document.querySelector('.submit');
var currentCard = document.querySelector('.current');
var cityValue = document.querySelector('.location');
var cityName = document.querySelector('.locationName');
var weatherDesc = document.querySelector('.weatherType');
var weatherTemp = document.querySelector('.temp');
var uv = document.querySelector('.UV');
var fiveDay = document.querySelector('.fiveday');
var latitude = 0;
var longitude = 0;
var currentDay = moment(); //Grabs current date prints to page
$(".date").text(currentDay.format("dddd, MMM Do")); 


sumbitBtn.addEventListener('click', function(){

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityValue.value+'&units=imperial&appid=0606d3b9cff69b3d73e7e260cab5ca3b')
    .then(response => response.json())
    .then(data => {
      currentCard.classList.add("card");
      console.log(data);
      var nameValue = data['name'];
      var temp = data['main']['temp'];
      
      var descValue = data['weather'][0]['description'];
      var lat = data['coord']['lat'];
      var lon = data['coord']['lon'];


      cityName.innerHTML = nameValue;
      weatherTemp.innerHTML = temp+'°F';
      weatherDesc.innerHTML = descValue;
      console.log(lat);
      console.log(lon);

      latitude = lat;
      longitude = lon;

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=imperial&exclude=current,minutely,hourly&appid=0606d3b9cff69b3d73e7e260cab5ca3b')
        .then(response => response.json())
          .then(data => {
            var dailyArray = data['daily'];
            console.log(latitude);
            console.log(longitude);
            console.log(data);
            var currentUV = data['daily'][0]['uvi'];
            var currentUVParsed = parseInt(currentUV); 
            console.log(currentUV)

            uv.innerHTML = 'UV Index: '+currentUV;
            if (currentUVParsed < 3){//NEEDS WORK
              uv.classList.add("goodUV") 
            } else if (currentUVParsed < 6){
              uv.classList.add("OKUV") 
            } else {
              uv.classList.add("badUV")
            };

            for(let i = 0; i < 5; i++){

              var dailyDescrip = dailyArray[i]['weather'][0]['description']; 
              var dailyTemp = dailyArray[i]['temp']['day'];
              var dailyDate = moment().add(i+1, 'days').calendar(); 
              var dailyUV = dailyArray[i]['uvi'];
              var dailyUVParsed = parseInt(dailyUV);
              console.log(dailyUV);
              console.log(dailyDate);
              console.log(dailyTemp);
              console.log(dailyDescrip); 
              var dailyTempPrint = dailyTemp+'°F';

              var newCard = document.createElement('div');
              console.log(newCard)
              newCard.classList.add("card-five");
              newCard.classList.add("card-body");

              var dailyDateEl = document.createElement('h5');
              dailyDateEl.innerHTML = dailyDate;
              newCard.appendChild(dailyDateEl);

              var dailyDescripEl = document.createElement('p');
              dailyDescripEl.innerHTML = dailyDescrip;
              console.log(dailyDescripEl)
              newCard.appendChild(dailyDescripEl);

              var dailyTempEl = document.createElement('p');
              dailyTempEl.innerHTML = dailyTempPrint;
              newCard.appendChild(dailyTempEl);

              var dailyUVEl = document.createElement('p');
              dailyUVEl.innerHTML = 'UV Index: '+dailyUV;
              newCard.appendChild(dailyUVEl);

              if (dailyUVParsed < 3){//NEEDS WORK
                dailyUVEl.classList.add("goodUV") 
              } else if (dailyUVParsed < 6){
                dailyUVEl.classList.add("OKUV") 
              } else {
                dailyUVEl.classList.add("badUV")
              };

              fiveDay.appendChild(newCard);

            }
        })
    })
})

