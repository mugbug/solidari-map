// var locations = [
//   // {lat: -22, lng: -45},
//   // {lat: -22, lng: -44}
//   // query data from views.py
//   {% for location in locations %}
//     {lat: {{ location.lat|safe }}, lng: {{ location.lng|safe }} },
//   {% endfor %}
// ]

var address;
function initMap() {
  var map;
  var mapDiv = document.getElementById('map');
  if(address == null){
    address = 'Pouso Alegre, MG, Brasil';
  }
  var geocoder = new google.maps.Geocoder();
  // Get lat/lng by address
  geocoder.geocode({
    "address": address
  }, function(results, status){
      map = new google.maps.Map(mapDiv, {
        // Center map (but check status of geocoder)
        center: results[0].geometry.location,
        zoom: 13,
      })
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

function updateAddress() {
  var city = document.getElementById('city').value;
  var state = document.getElementById('sel1').value;
  address = city + ', ' + state + ', Brasil';
  initMap()
}
