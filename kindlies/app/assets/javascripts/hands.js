var reader = new FileReader();
var dataToUpload = {};
var imageFile;
var currentViewNew;
var currentViewHot;

//WHEN THE DOCUMENT IS READY....SHOW THE FORM AND ALLOW USER TO SUBMIT CONTENT.
$(document).ready(function(){

  $('#file').on('focusout', function() {

    reader.onload = function (event) {
      try {
        console.log(event.target.result);
          dataToUpload.file = event.target.result;
      } catch (ex) {
          throw new Error("Some shit went down");
      }
    }

    var file = document.getElementById('file');

    reader.readAsDataURL(file.files[0]);
  });
  imageFile = dataToUpload.file;

//=======================================
  getCoords();

  $( "#new_hand" ).hide();

  $("#share-something-form-toggle").click(function(){
    $( "#new_hand" ).fadeIn(500);
  })



  getNewDeeds();
  getHotDeeds();

  $("#new-tab").click(function(){
    $("#hand-stage").empty()
    getNewDeeds();
    currentViewNew = true;
    currentViewHot = false;
    console.log(currentViewNew);
    console.log(currentViewHot);
  })

  $("#hot-tab").click(function(){
    $("#hand-stage").empty()
    getHotDeeds();
    currentViewNew = false;
    currentViewHot = true;
    console.log(currentViewNew);
    console.log(currentViewHot);
  })

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

//*****VIEW FUNCTIONS*****

//CREATING VIEWS
function getNewDeeds(){
  $.ajax({
      method: 'get',
      url: '/api_new',
      dataType: 'json',
      success: function(list){
        currentViewNew = true;
        currentViewHot = false;
        console.log(list)
        $("#hand-stage").html("");
        var $el = $("#hand-stage");
        for (var model in list){
          var deed = list[model]
          var view = new NewHandsView();
          view.render(deed);
          $el.append(view.$el);
        }
      }
    })
}

function getHotDeeds(){

  $.ajax({
      method: 'get',
      url: '/api_hot',
      dataType: 'json',
      success: function(list){
        currentViewNew = false;
        currentViewHot = true;
        $("#hand-stage").html("");
        var $el = $("#hand-stage");
        for (var model in list){
          var deed = list[model]
          var view = new HotHandsView();
          view.render(deed);
          $el.append(view.$el);
        }
      }
    })
}

//*****MAP FUNCTIONS*****

//DECLARES VARIABLES FOR LOCATION AND FOR AJAX....NEED TO NAMESPACE
var latitude;
var longitude;
var summary;
var content;
var marker;
var locations;

//THIS FUNCTION RETRIEVES THE LOCATION OF THE USER THAT WILL BE ASSIGNED TO THE NEW POST
function getCoords(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude,longitude);

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
  var imageData = dataToUpload.file;
  $.ajax({
    method: "post",
    url: "/hands",
    dataType: 'json',
    data: { hand: {title: summary, message: content, lat: latitude, long: longitude, image: imageData }, authenticity_token: token },
    success: function(){
      console.log("data added successfully!");
      if (currentViewNew == false && currentViewHot == true){
        getHotDeeds();
      }
      else{
        getNewDeeds();

      }
      console.log(currentViewNew)
    }
  });
}


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

      var contentString = "hello my name is gaby !!!!!!";
      infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(contentString);
          infowindow.open(mapName, marker);
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
