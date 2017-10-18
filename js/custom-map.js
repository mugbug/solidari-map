var geocoder;
var map;

//Custom timeout for keydown event
var timeoutId = 0;

//Initialize Google Maps API's map
function initMap() {
  // get json data and set markers
  var JSONobject
  var object
  var request = new XMLHttpRequest();
  var infowindow = new google.maps.InfoWindow();
  
  //Initialize map
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: -22.2527245, lng: -45.7016189 }
  });

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      JSONobject = JSON.parse(this.responseText);
      object = JSONobject.data;

      //Set markers
      for (var i in object) {
        info = 
          '<h5>' + object[i].name + '</h5>' +
          '<p><b>Endereço:</b> ' + object[i].address + '</p>' +
          '<p><b>Telefone:</b> ' + object[i].phone + '</p>';

        geocodeAddress(geocoder, map, object[i].address, object[i].name, infowindow, info);
      }
    }
  };
  request.open("GET", "https://raw.githubusercontent.com/mugbug/fetin-2017/master/fetin2017/static/js/data.json", true);
  request.send();
}

// Set markers
function geocodeAddress(geocoder, resultsMap, address, name, infowindow, info) {
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      // resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        title: name
      });
      
      marker.addListener('click', function () {
        infowindow.setContent(info);
        infowindow.open(map, this);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
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