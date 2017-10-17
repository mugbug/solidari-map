var geocoder;
var map;

//Custom timeout for keydown event
var timeoutId = 0;

//Initialize Google Maps API's map
function initMap() {
  //Initialize map
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: -22.2527245, lng: -45.7016189 }
  });
  //Set markers
  var object = readJSON();
  console.log(object)
  for (var i in object) {
    var marker = new google.maps.Marker({
      position: convertAddressToCoordinates(object[i].address),
      map: map,
      title: object[i].name
    });
  }
}

function readJSON() {
  var JSONobject
  // var JSONobject;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
      JSONobject = JSON.parse(this.responseText);
    }
  };
  request.open("GET", "https://raw.githubusercontent.com/mugbug/fetin-2017/master/fetin2017/static/js/data.json", true);
  request.send();

  return JSONobject;
}

function convertAddressToCoordinates(address) {
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == "OK") {
      return results[0].geometry.location;
    }
  })
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