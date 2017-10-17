var geocoder;
var map;

//Custom timeout for keydown event
var timeoutId = 0;

//Initialize Google Maps API's map
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: -22.2527245, lng: -45.7016189 }
  });
}

//Converts address to latitude and longitude and place on map's center
function addressToCoordinates() {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(function getGeocode() {
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;
    var neighborhood = document.getElementById('neighborhood').value;
    var address = neighborhood + ', ' + city + ', ' + state;
  
    if (neighborhood == '') {
      map.setZoom(14);
    }
    else {
      map.setZoom(15);
    }
  
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == "OK") {
        map.setCenter(results[0].geometry.location);
      }
    });
  }, 1000);
}