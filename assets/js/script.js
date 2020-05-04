var searchButton = document.getElementById( 'click' ).addEventListener( 'click',weatherData );
const key = 'daa141c68c103d563b57cd3f0c026d92';
var box = document.querySelector( 'main .wrapper' );

//Function to featch weather data
function weatherData( event ) {
  event.preventDefault();
  var name = document.getElementById( 'searchInput' ).value;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid="+key+"&units=metric";
  
  fetch( url )
  .then(function (response) {
    return response.json();
    })
    .then(function (data) { 
      if( data['cod'] == "400" || data['cod'] == "404" ) {
        alert( "Invalid city name" );
        return false;
      }   
      displayWeather(data);
    })
    .catch(function (error) {
      console.log("Something went wrong!", error);
  });
  clearData();
}

// Function to clear input box and weather data
function clearData() {
  document.getElementById( 'searchInput' ).value = '';
  box.innerHTML= '';
}

//Function to display weather data
var cityName, icon, desc, humidity, id;
function displayWeather( data ) {
  var main = document.querySelector( 'main .wrapper' );
  var container = document.createElement( 'div' );
  container.setAttribute( 'class', "container" );
  main.appendChild( container );

  //City name data
  cityName = data['name'];
  var nameElement = document.createElement('p');
  nameElement.setAttribute( 'class', "nameElement" );
  nameElement.innerHTML = cityName;
  container.appendChild( nameElement );

  //Temperature data
  temp = data['main']['temp'];
  var tempElement = document.createElement( 'p' );
  tempElement.innerHTML = "Temparature: "+ Math.round(temp) +"&#x2103;";
  container.appendChild( tempElement );

  //Icon data
  icon = data['weather'][0]['icon'];
  var iconElement = document.createElement( 'IMG' );
  iconElement.setAttribute( 'class',"iconElement" );
  var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  iconElement.setAttribute( 'src', iconUrl );
  container.appendChild( iconElement );

  //Description data
  desc = data['weather'][0]['description'];
  var descElement = document.createElement( 'p' );
  descElement.innerHTML = "Description: "+desc;
  container.appendChild( descElement );

  //Humidity data
  humidity = data['main']['humidity'];
  var humidityElement = document.createElement( 'p' );
  humidityElement.innerHTML = "Humidity: "+humidity;
  container.appendChild( humidityElement );

  //Id data
  id = data['weather'][0]['id'];
  color( id );
}

//Function to change background

var setImg;
function color ( id ) {
  if ( id >= 500 && id <= 531 ){
    setImg = "rain";
	}else if ( id >= 600 && id <= 622 ) {
    setImg = "snow";
	}else if ( id === 800 ) {
    setImg = "clear";
	}else if ( id >= 801 && id <= 804 ) {
    setImg = "cloudy";
	}else if ( id === 903 ) {
    setImg = "cold";
	}else if ( id === 904 ) {
    setImg = "sunny";
	}else if ( id === 905 ) {
    setImg = "wind";
  }else if ( id >= 701 && id <= 781 ) {
    setImg = "smoke";
  }else {
    box.style.backgroundColor = "#fff";
    return false;
  };
  var bgImage = setImg+".jpeg";
  var bgUrl = 'url( "assets/images/'+bgImage+'" ) no-repeat';
  box.style.background = bgUrl;
  box.style.backgroundPosition = 'center';
  box.style.backgroundSize = 'cover';     
}
