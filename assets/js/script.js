


$(document).ready(() => {

    var clickButton = $('#clickButton');
    

    clickButton.on('click', function(){

        var input = $('#getCity');
        console.log(input.val());

        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=47.6038321&lon=-122.330062&units=imperial&appid=7a516f1ed38e70e2b0299f025745f5d6")
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {

            $('#city').text(data.city.name);
            for(var i = 0; i<6; i++){
                var skip = i * 7;
                $('.date').eq(i).text(dayjs.unix(data.list[skip].dt).format('MM/DD/YYYY'));
                console.log(dayjs.unix(data.list[skip].dt).format('MM/DD/YYYY'));
                console.log(data.list[skip].dt);
                $('.icon').eq(i).attr("src","http://openweathermap.org/img/wn/"+ data.list[i+1].weather[0].icon +".png");
                $('.temp').eq(i).text("Temp: " + data.list[skip].main.temp + " °F");
                $('.wind').eq(i).text("Wind: " + data.list[skip].wind.speed + " MPH");
                $('.humid').eq(i).text("Humidity: " + data.list[skip].main.humidity + "%");
            }
        })
    });


        
})

  


//   http://api.openweathermap.org/geo/1.0/direct?q=seattle&appid=7a516f1ed38e70e2b0299f025745f5d6


//   https://api.openweathermap.org/data/2.5/forecast?lat=47.6038321&lon=-122.330062&appid=7a516f1ed38e70e2b0299f025745f5d6


// https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}