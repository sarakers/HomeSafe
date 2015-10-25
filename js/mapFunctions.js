function findRoutes(given_origin, given_destination){
  var directionsService = new google.maps.DirectionsService();

  var directionsRequest = {
    origin: given_origin,
    destination: given_destination,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC
  };

  directionsService.route(directionsRequest, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var durations;
        var distances;
        var latlngs;
        for (i = 0; i < 4; i++) {
          durations[i] = response.route[i].legs[0].durations.text;
          distances[i] = response.route[i].legs[0].distance.text;
          latlngs[i] = {
            lat: response.route[i].legs[0].steps;
          };
        };
      } else { console.log("There was an error with the request") }
  });
}
