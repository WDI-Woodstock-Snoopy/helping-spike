// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//submit = 5 points
//upvote = 1 point
//CREATE MAP THAT IS CENTERED ON Chicago

var map;

function initializeMap(){
  var defaultCenter = new google.maps.LatLng(41.893974, -87.627945);
  var defaultOptions = {
    zoom: 14,
    center: defaultCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  largeMap = new google.maps.Map(document.getElementById("largeMap"), defaultOptions);
  smallMap = new google.maps.Map(document.getElementById("smallMap"), defaultOptions);

  renderMarkers(largeMap);
  renderMarkers(smallMap);

}

google.maps.event.addDomListener(window, 'load', initializeMap);  
