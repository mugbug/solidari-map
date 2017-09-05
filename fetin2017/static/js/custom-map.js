// var locations = [
//   // {lat: -22, lng: -45},
//   // {lat: -22, lng: -44}
//   // query data from views.py
//   {% for location in locations %}
//     {lat: {{ location.lat|safe }}, lng: {{ location.lng|safe }} },
//   {% endfor %}
// ]

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -22.2526, lng: -45.7042},
    zoom: 8
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
