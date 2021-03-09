var sumbitBtn = document.querySelector('.submit');
var cityValue = document.querySelector('.location');
var cityName = document.querySelector('.locationName');
var weatherDesc = document.querySelector('.weatherType');
var weatherTemp = document.querySelector('.temp');
var fiveDay = document.querySelector('.fiveday');
var latitude = 0;
var longitude = 0;


sumbitBtn.addEventListener('click', function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityValue.value+'&appid=0606d3b9cff69b3d73e7e260cab5ca3b')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var nameValue = data['name'];
      var temp = data['main']['temp'];
      
      var descValue = data['weather'][0]['description'];
      var lat = data['coord']['lat'];
      var lon = data['coord']['lon'];

      cityName.innerHTML = nameValue;
      weatherTemp.innerHTML = temp;
      weatherDesc.innerHTML = descValue;
      latitude = lat;
      longitude = lon;
      console.log(latitude);
      console.log(longitude);
    })

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=current,minutely,hourly&appid=0606d3b9cff69b3d73e7e260cab5ca3b')
  .then(response => response.json())
    .then(data => {
      var dailyArray = data['daily'];
      console.log(data);
      console.log(dailyArray);
      for(let i = 0; i <dailyArray.length; i++){
        console.log(dailyArray[i]);
        var dailyTemp = dailyArray[i]['temp']['day'];
        var dailyDescrip = dailyArray[i]['weather'][0]['description'];
        console.log(dailyTemp);
        console.log(dailyDescrip);
      }
  })

})