// given a number of crimes on a single route and 
// route length, give a safety rating
function getSafetyOfRoute(crimeCount, routeLength)
{
   
  return (crimeCount / routeLength);
}

//
getSafetyOfRoutes


//Get the JSON response from given API. 
function getFromURL(url)
{
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",url,false);
	Httpreq.send(null);
	return Httpreq.responseText;    
}

//Function to return the number of crimes on a given road. 
function getNoOfCrimes(long, lat)
{
  var count = 0;
  var year = new Date().getYear()+1899;
  var month = new Date().getMonth()+1;

  //var url = "https://data.police.uk/api/crimes-at-location?date=" + year + "-" + month + "&lat=" + lat + "&lng=" + long;
  var url = "https://data.police.uk/api/crimes-at-location?date=2014-10&lat="+lat+"&lng="+long;
  apiData = JSON.parse	(getFromURL(url));
  count = apiData.length;
  
  return count;
  } 
  

//Finds a route from a start point to a destination. 
function findRoutes(given_origin, given_destination){
  var directionsService = new google.maps.DirectionsService();

  var directionsRequest = {
    origin: given_origin,
    destination: given_destination,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC,
    provideRouteAlternatives: true
  };

  var selectedRoutes = new Array();

  function route_step(given_lng, given_lat){
    this.route_lng = given_lng;
    this.route_lat = given_lat;
  }

  function selectedRoute(response, i){
    this.route_duration = response.routes[i].legs[0].duration.text;
    this.route_distance = response.routes[i].legs[0].distance.text;
    this.route_steps = new Array();

    for (s = 0; s < response.routes[i].legs[0].steps.length; s++) {
      this.route_steps[s] = new route_step(response.routes[i].legs[0].steps[s].start_location.lng(),
                                           response.routes[i].legs[0].steps[s].start_location.lat());
    }
  }

  directionsService.route(directionsRequest, function(response, status) {

      if (status == google.maps.DirectionsStatus.OK) {
        for (i = 0; i < response.routes.length && i < 4 ; i++) {
           selectedRoutes[i] = new selectedRoute(response, i);
        }
		
		//Array which holds the latitude and longitude of each step in the route. 
	    var stepLatLongArray = new Array();

		for(i = 0; i < selectedRoutes[0].route_steps.length; i++)
		{
          stepLatLongArray[i] = new Array(selectedRoutes[0].route_steps[i].route_lng, selectedRoutes[0].route_steps[i].route_lat);
          getNoOfCrimes(stepLatLongArray[i][0], stepLatLongArray[i][1]);

		  $('#routes tbody').after('<tr>...</tr>');	
		}
		
		console.log(stepLatLongArray.length);
		

      } else { console.log("There was an error with the request") }
  });
  return selectedRoutes;
}
