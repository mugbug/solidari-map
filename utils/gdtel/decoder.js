var flag = 'OK';
var try_index;

function initMap() {
    var geocoder = new google.maps.Geocoder();
    var request = new XMLHttpRequest();

    flag = 'OK'

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            JSONobject = JSON.parse(this.responseText);
            object = JSONobject.ongs;

            geocode1(geocoder, object);
        }
    };
    // Change this URL when get final JSON data
    request.open("GET", "https://raw.githubusercontent.com/mugbug/fetin-2017/develop/utils/ONGs.json", true);
    request.send();
}

// *** JSON 1 ***
//Interval: 0 to 2499
//Status: DONE 
function geocode1(geocoder, object) {
    var index = 0;
    try_index = 0;
    var timer = setInterval(function () {
        if (index < 10000) {
            console.log(index + ' - ' + object[index]);
            geocodeAddress(geocoder, object, index);
            if (flag == 'OK' || try_index >= 5) {
                index++;
                try_index = 0;
            }
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 200);
}

// *** JSON 2 ***
//Interval: 2500 to 4999
//Status: DONE 
function geocode2(geocoder, object) {
    var index = 2500;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 5000) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 100);
}

// *** JSON 3 ***
//Interval: 5000 to 7499
//Status: DONE 
function geocode3(geocoder, object) {
    var index = 5000;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 7500) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 100);
}

// *** JSON 4 ***
//Interval: 7500 to 9999
//Status: DONE 
function geocode4(geocoder, object) {
    var index = 7500;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 10000) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 100);
}

// *** JSON 5 ***
//Interval: 10000 to 12499
//Status: DONE 
function geocode5(geocoder, object) {
    var index = 10000;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 12500) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 100);
}

// *** JSON 6 ***
//Interval: 12500 to 14999
//Status: DONE
function geocode6(geocoder, object) {
    var index = 12500;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 15000) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 100);
}

// *** JSON 7 ***
//Interval: 15000 to 17499
//Status: DONE
function geocode7(geocoder, object) {
    var index = 15000;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 17500) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 100);
}

// *** JSON 8 ***
//Interval: 17500 to 19999
//Status: DONE 
function geocode8(geocoder, object) {
    var index = 17500;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < 20000) {
            geocodeAddress(geocoder, object, index);
            index++;
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 50);
}

// *** JSON 9 ***
//Interval: 20000 to end
//Status: 
function geocode9(geocoder, object) {
    var index = 20000;
    var timer = setInterval(function () {
        console.log(object[index]);
        if (index < object.length) {
            geocodeAddress(geocoder, object, index, flag);
            if (flag == 'OK') {
                index++;
            }
        }
        else {
            clearInterval(timer);
            generateJSON(object);
        }
    }, 50);
}

function geocodeAddress(geocoder, object, i) {
    geocoder.geocode({ 'address': object[i].address }, function (results, status) {
        if (status == 'OK') {
            object[i].location = { 'lat': results[0].geometry.location.lat(), 'lng': results[0].geometry.location.lng() };
            flag = status;
            object[i].response = flag;
        }
        else if (status == 'ZERO_RESULTS') {
            object[i].address = null;
            flag = status;
            object[i].response = flag;
        }
        try_index++;
    });
}

function generateJSON(object) {
    object = { 'ongs': object };

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "ongs-updated.json");
    dlAnchorElem.click();
}

