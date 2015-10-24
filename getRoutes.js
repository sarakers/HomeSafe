function getRoutes(start_location, end_location)
{
	// Construct a request URL for getting the directions
	var requestURL = constructURL('directions', start_location, end_location);

	// Get results as JSON from the request URL
	var results = $.getJSON(requestURL);

	// Check status of results and deal with it accordingly
	if (results.status == "NOT_FOUND")
	{
		// One or both of the origin or destination could not be geocoded
		// These locations need to be checked by the user and corrected
	  document.getElementById("error_message").innerHTML =
	  								"Incorrect location - please check and correct.";
	} // if
	else if (results.status == "ZERO_RESULTS")
	{
		// No routes found between these locations
		document.getElementByID("error_message").innerHTML = "No routes found.";
	} // if
	else if (results.status == "INVALID_REQUEST"_
	{
		// The request was invalid - CHECK PARAMETERS
		document.getElementById("error_message").innerHTML = "Request was invalid.";
	} // if
	else if (results.status == "OK")
	{
		// Results have been found so parse and deal with results
		var routes = parseResults(results);
	} // if
} // getRoutes