function parseResults(results)
{
	var routes = new Array();

	// Store the first 5 routes from results into the routes array.
	// For each route, store the copyright information, viewport bounding box,
	// overview polyline (graphical representation of the route), steps, distance,
	// and duration (human readable text and seconds)
	for (i = 0; i < 4; i++)
	{
		routes[i] = {
			this.copyrights = results.copyrights;
			this.bounds = results.bounds;
			this.overview_polyline = results.overview_polyline;
			this.distance = results.legs[0].distance.text;
			this.duration_text = resuts.legs[0].duration.text;
			this.duration_seconds = results.legs[0].duration.value;
			this.steps = new Array();

			// Populate the steps array
			for (step = 0; step < (results.legs[0].steps).length; step++)
			{
				steps[i] = {
					this.instruction = results.legs[0].steps[step].html_instructions;
					this.start_latlng = results.legs[0].steps[step].start_location;
					this.dest_latlng = results.legs[0].steps[step].end_location;
				} // create step object
			} // for
		} // create route object
	} // for

	return routes;
} // parseResults