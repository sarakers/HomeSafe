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

    this.copyright = response.routes[i].copyrights;
  }

  return directionsService.route(directionsRequest, function(response, status) {

      if (status == google.maps.DirectionsStatus.OK) {
        for (i = 0; i < response.routes.length && i < 4 ; i++) {
           selectedRoutes[i] = new selectedRoute(response, i);
        }
        console.log(selectedRoutes);
        return selectedRoutes;
      } else { console.log("There was an error with the request") }
  });
  console.log(selectedRoutes);
}
