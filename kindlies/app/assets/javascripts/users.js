<<<<<<< HEAD
// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//submit = 5 points
//upvote = 1 point
=======
//CREATE MAP THAT IS CENTERED ON Chicago

var map;

function initializeMap(){
  var defaultCenter = new google.maps.LatLng(41.893974, -87.627945);
  var defaultOptions = {
    zoom: 14,
    center: defaultCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  // mainMap = new google.maps.Map(document.getElementById("mainMap"), defaultOptions);
  largeMap = new google.maps.Map(document.getElementById("largeMap"), defaultOptions);

  // renderMarkers(mainMap);
  renderMarkers(largeMap);
}

google.maps.event.addDomListener(window, 'load', initializeMap);
>>>>>>> caad8e6350df14fe0573c43c7a7e5ee68992b91f
