$(document).ready(() => {

    var clickButton = $('#clickButton');
    var oldSearch = JSON.parse(localStorage.getItem("oldCity")) || [];
    createOldList();

    //Function that runs when the search button is clicked
    //takes the input and uses fetch to grab the lon and lat coordinates for the location
    //put the name, and cordinates into an object so we can store it into local store
    //runs displayWeather function and passing the lon and lat data
    //also checks if the list of array already contains the recently searched city. if it does then 
    clickButton.on('click', function(event){
        event.preventDefault();
        var input = $('#getCity');
        if (input.val() == ""){
            alert("please enter a city");
            return;
        }
        displayWeather(input.val());

    })

    function displayWeather(cityName){
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=7a516f1ed38e70e2b0299f025745f5d6")
        .then(function (response) {
            if(response.status > 400 ){
                alert("invalid city. Please try again");
            } else {
                var hidden = $('#hideThis')
                hidden.attr("class","col-12 col-lg-9");
                return response.json();

            }
        })
        .then(function(data) {

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
            if(!oldSearch.includes(data.city.name)){
                oldSearch.push(data.city.name);
            }
            localStorage.setItem("oldCity", JSON.stringify(oldSearch));
            createOldList();
        })
    }

    function createOldList(){
        oldSearch = JSON.parse(localStorage.getItem("oldCity")) || [];
        $('#oldList').empty();
        for(var i = 0; i<oldSearch.length; i++){
            var newList = $("<li>");
            var newButton =$("<button>")
            newButton.text(oldSearch[i]);
            newButton.attr("cityname", oldSearch[i]);
            newButton.attr("class", "w-100")
            newButton.on("click",function(){
                displayWeather($(this).attr("cityname"));
            });
            // newList.attr("class","list-group-item");
            newList.append(newButton);
            $('#oldList').append(newList);
        }
    }       
})

  


//   http://api.openweathermap.org/geo/1.0/direct?q=seattle&appid=7a516f1ed38e70e2b0299f025745f5d6


//   https://api.openweathermap.org/data/2.5/forecast?lat=47.6038321&lon=-122.330062&appid=7a516f1ed38e70e2b0299f025745f5d6


// https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}