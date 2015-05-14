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
