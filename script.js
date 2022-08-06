document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === ""){
      return;}
    console.log(value);


    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=72d8e83de8c13ce59ccc378bd1e1495e";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let results = "";
            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2></br>"
            results += '<h3><em>' + json.main.temp_min + " &deg;F" + " - " + json.main.temp_max + " &deg;F</em></h3></br>"

            let sunriseDate = new Date(json.sys.sunrise * 1000);
            let sunrise = sunriseDate.getHours() + ':' + ("0" + sunriseDate.getMinutes()).substr(-2) + ' AM';

            let sunsetDate = new Date(json.sys.sunset * 1000);
            let sunset = (sunsetDate.getHours()-12) + ':' + ("0" + sunsetDate.getMinutes()).substr(-2) + ' PM';

            results += '<p> Sunrise: ' + sunrise + '</p></br>';
            results += '<p> Sunset: ' + sunset + '</p></br>';
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
            results += ", "
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;

        });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=72d8e83de8c13ce59ccc378bd1e1495e";
    fetch(url2)
        .then(function(response) {
        return response.json();
        }).then(function(json) {
        console.log(json);

        let forecast = "";
        for (let i=0; i < json.list.length; i++) {
        forecast += "<div class='apiReturn'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a')+ "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>"
        + "<p>Humidity: " + json.list[i].main.humidity + "</p>" + "<p>Wind: " + json.list[i].wind.speed + "</p>" +"</div>";
       // forecast += '<p><em>' + json.list[i].main.temp_min + " &deg;F" + " - " + json.list[i].main.temp_max + " &deg;F</em></p>";
       // forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';


        forecast += ""
        }

        document.getElementById("forecastResults").innerHTML = forecast;

        });
  });
