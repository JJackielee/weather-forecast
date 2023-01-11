$(document).ready(() => {

    var clickButton = $('#clickButton');
    var oldSearch = [];
    createOldList();

    //Function that runs when the search button is clicked
    //prevents the default action of the form so it doesnt refreshes
    //it grabs the value in the input area
    //checks if the input is empty. if so it returns to stop the code
    //runs displayWeather with the input the user typed in.
    clickButton.on('click', function(event){
        event.preventDefault();
        var input = $('#getCity');
        if (input.val() == ""){
            alert("please enter a city");
            return;
        }
        displayWeather(input.val());

    })


    //displayWeather function that takes a parameter
    //uses the parameter to call an API query to get json data on that city input
    //if the input is not a valid city it will alert user that its not city
    //if it is a valid city then it will return json data of that city that we got from the weather API
    //using jquery to grab elements in the HTML we read the json data and put that data in specific element like temp, humidity, and wind
    //uses a forloop to loop through the 6 days
    //check if the city that was just entered in the array of Search city. if array doesnt contain the city already then it will add that city into the array
    //runs CreateOldList function to display the cities that was previously searched up

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

    //createOldList function that display the previous cities that was searched
    // it first gets the list of old cities from localstorage in a form of an array
    //loops through the array. and creates a button for each city that was searched
    //uses a data attribute to store the name of the city searched so we can grab that data to search it again
    //also gives each button that is created an eventlistener to do something when its clicked
    // when its clicked it runs the displayWeather function again and pass the city name into the parameters
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