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
    center: { lat: -22.2527245, lng: -45.7016189 },
    // styles: style.retro,
  });

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      JSONobject = JSON.parse(this.responseText);
      object = JSONobject.ongs;
      //Set markers
      for (var i in object) {
        if (object[i].address != null) {
          info =
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">' + object[i].name + '</h3>' +
            '</div>' +
            '<div class="panel-body">' +
            '<p><b>Endereço:</b> ' + object[i].address + '</p>' +
            '<p><b>Telefone:</b> ' + object[i].phone + '</p>' +
            '</div>' +
            '</div>';
          generateMarker(map, object[i].address, object[i].name, object[i].location, infowindow, info);
        }
      }
    }
  };
  // Change this URL when get final JSON data
  request.open("GET", "https://raw.githubusercontent.com/mugbug/fetin-2017/develop/utils/ongs-updated.json", true);
  request.send();
}

function generateMarker(resultsMap, address, name, location, infowindow, info) {
  // demo icon
  var icons = {
    ong: {
      icon: 'https://i.imgur.com/62hXFAC.png'
    },
  };

  var marker = new google.maps.Marker({
    map: resultsMap,
    position: location,
    title: name,
    icon: icons['ong'].icon
  });

  marker.addListener('click', function () {
    infowindow.setContent(info);
    infowindow.setOptions({ maxWidth: 400 });
    infowindow.open(map, this);
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
    var address;

    if (neighborhood == '') {
      map.setZoom(14);
      neighborhood = 'Centro';
    }
    else {
      map.setZoom(15);
    }

    address = neighborhood + ', ' + city + ', ' + state + ', Brasil';

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == "OK") {
        map.setCenter(results[0].geometry.location);
      }
    });
  }, 1000);
}

var style = {
  retro: [
    { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#c9b2a6' }]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#dcd2be' }]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ae9e90' }]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#93817c' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#a5b076' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#447530' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#f5f1e6' }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#fdfcf8' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#f8c967' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#e9bc62' }]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{ color: '#e98d58' }]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#db8555' }]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#806b63' }]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#8f7d77' }]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ebe3cd' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b9d3c2' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#92998d' }]
    }
  ],
}