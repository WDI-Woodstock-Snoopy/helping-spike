// // # Place all the behaviors and hooks related to the matching controller here.
// // # All this logic will automatically be available in application.js.
// // # You can use CoffeeScript in this file: http://coffeescript.org/

//DECLARES VARIABLES FOR LOCATION AND FOR AJAX....NEED TO NAMESPACE
var latitude;
var longitude;
var summary;
var content;
var locations = [];
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
}

//THIS FUNCTION SENDS THE POST REQUEST WITH THE FORM DATA AND LOCATION COORDINATES
function submitData(){
  $.ajax({
    method: "POST",
    url: "/hands",
    data: { hand: {title: summary, message: content, lat: latitude, long: longitude }, authenticity_token: token },
    success: function(){
      console.log("data added successfully!");
    }
  });
}

  // // To add the marker to the map, call setMap();
  // // marker.setMap(map);


//WHEN THE DOCUMENT IS READY....SHOW THE FORM AND ALLOW USER TO SUBMIT CONTENT.

$(document).ready(function(){

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
  // Send the data using post
  submitData();
  })

})
