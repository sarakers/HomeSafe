function findRoutes(given_origin, given_destination){
  var directionsService = new google.maps.DirectionsService();

  var directionsRequest = {
    origin: given_origin,
    destination: given_destination,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC,
    provideRouteAlternatives: true
  };

  var times = new Array();
  var lengths = new Array();
  var positions = new Array();

  directionsService.route(directionsRequest, function(response, status) {

      if (status == google.maps.DirectionsStatus.OK) {
        for (i = 0; i < response.routes.length && i < 4 ; i++) {
          times[i] = response.routes[i].legs[0].duration.text;
          lengths[i] = response.routes[i].legs[0].distance.text;
        }
      } else { console.log("There was an error with the request") }
  });

  console.log(lengths[2]);
}
