
//DECLARES TIME/DATE VARS
var today = new Date();
var hourNow = today.getHours();
var greeting;
var display = $('#greetings')

//DISPLAYS TIME-BASED GREETING TO CURRENT_USER
function heyYall(){
  if (hourNow > 18){
    greeting = 'Good Evening, ';
  } else if (hourNow > 12){
    greeting = 'Good Afternoon, ';
  } else if (hourNow > 0){
    greeting = 'Good Morning, ';
  } else {
    greeting = 'Welcome, ';
  }
  display.prepend(greeting);
}

heyYall()


//DECLARES VARIABLES FOR LOCATION AND FOR AJAX....NEED TO NAMESPACE
var latitude;
var longitude;
var summary;
var content;
var marker;

//THIS FUNCTION RETRIEVES THE LOCATION OF THE USER THAT WILL BE ASSIGNED TO THE NEW POST
function getCoords(callback){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude,longitude);

      callback();

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // if Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Please turn on Location Services.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }
  }
}

//THIS FUNCTION SENDS THE POST REQUEST WITH THE FORM DATA AND LOCATION COORDINATES
function submitData(){
  $.ajax({
    method: "POST",
    url: "/hands",
    data: { hand: {title: summary, message: content, lat: latitude, long: longitude }, authenticity_token: token },
    success: function(){
      console.log("data added successfully!");
      getHotDeeds();
    }
  });
}

//WHEN THE DOCUMENT IS READY....SHOW THE FORM AND ALLOW USER TO SUBMIT CONTENT.
$(document).ready(function(){

  getHotDeeds();

  $( "#new_hand" ).hide();
  getCoords(function(){
    $( "#new_hand" ).fadeIn(500);
  });

  $( "#new_hand" ).submit(function( event ) {
  // Stop form from submitting normally
  event.preventDefault();
  // Get some values from elements on the page:
  summary = $( "#new_hand" ).find( "input[name='hand[title]']" ).val();
  content = $( "#new_hand" ).find( "input[name='hand[message]']" ).val();
  token = $( "#new_hand" ).find( "input[name='authenticity_token']" ).val();
  image = $("#new_hand").find("input[name='hand[image]']").val();
  // Send the data using post
  submitData();

  summary = $( "#new_hand" ).find( "input[name='hand[title]']" ).val("");
  content = $( "#new_hand" ).find( "input[name='hand[message]']" ).val("");

  })



})

//AJAX REQUEST TO CREATE MARKERS
function renderMarkers(mapName){
  $.ajax({
      method: 'get',
      url: '/api',
      dataType: 'json',
      })
    .done(function(data){
      console.log(data)

      for (var i = 0; i < data.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(data[i].lat, data[i].long),
          map: mapName
        });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    };
  });
}

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
  smallMap = new google.maps.Map(document.getElementById("smallMap"), defaultOptions);

  // renderMarkers(mainMap);
  renderMarkers(smallMap);
}

google.maps.event.addDomListener(window, 'load', initializeMap);


//CREATING VIEWS
function getHotDeeds(){
  $.ajax({
      method: 'get',
      url: '/api_new',
      dataType: 'json',
      success: function(list){
        $("#all-acts-view").html("");
        var el = $("ul");
        for (var model in list){
          var deed = list[model]
          var view = new handsView()
          view.render(deed);
        }
      }
    })
}
