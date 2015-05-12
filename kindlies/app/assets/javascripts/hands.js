// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
console.log('hello!!')

var map;
var latitude;
var longitude;

$(document).ready(function(){

  $('#new_hand').submit(function(e){
    e.preventDefault();
    console.log('TESTING 123')

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        latitude = new google.maps.LatLng(position.coords.latitude);
        longitude = new google.maps.LatLng(position.coords.longitude);
        console.log(latitude.A,longitude.A);

      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }

    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var content = 'Please turn on Location Services.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }
    }
  })

})

// google.maps.event.addDomListener(window, 'load', initializeMap);


//==================================== get location coordinates from user input
