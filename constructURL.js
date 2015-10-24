function constructURL(api_used, start_location, end_location)
{
	BASE_URL = 'https://maps.googleapis.com/maps/api';
	brower_key = 'AIzaSyC3A5IoN5RMfDSa_B-XUBkh0Eh6PbBFP2o';

	var query;
	if (api_used == directions)
		query = '/json?mode=walking&alternatives=true&origin=' + start_location
						+ '&destination=' + end_location + '&key=' + browser_key;
	else if (api_used == geocode)
		query = '/json?latlng=' + start_location + '&result_type=route&key='
						+ browser_key;

	return BASE_URL + api_used + query
} // constructURL
