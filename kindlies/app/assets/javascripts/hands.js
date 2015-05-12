# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

var map;
var latitude;
var longitude;

function initializeMap(){
  // var defaultCenter = new google.maps.LatLng(41.893974, -87.627945);
  //
  // var defaultOptions = {
  //   zoom: 14,
  //   center: defaultCenter,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // };

  // map = new google.maps.Map(document.getElementById('map'), defaultOptions);

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      latitude = new google.maps.LatLng(position.coords.latitude);
      longitude = new google.maps.LatLng(position.coords.longitude);
      console.log(latitude.A,longitude.A);

      // var infowindow = new google.maps.InfoWindow({
      //   zoom: 20,
      //   map: map,
      //   position: pos,
      //   content: 'Location found using HTML5.'
      // });
      //
      // map.setCenter(pos);
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

    // var options = {
    //   map: map,
    //   position: defaultCenter,
    //   content: content
    // };
    //
    // var infowindow = new google.maps.InfoWindow(options);
    // map.setCenter(options.position);
  }
}

google.maps.event.addDomListener(window, 'load', initializeMap);


//==================================== get location coordinates from user input

  // $.ajax({
  //   method: 'POST',
  //   url: '/posts',
  //   dataType: 'json',
  //   data: {user: { lat: 'latitude', long: 'long' }},
  //   success: (function(data){
  //     console.log(data);
  //   })
  // })
