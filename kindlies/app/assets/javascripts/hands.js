//*****VIEW FUNCTIONS*****

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

//CREATING VIEWS
function getNewDeeds(){
  $.ajax({
      method: 'get',
      url: '/api_new',
      dataType: 'json',
      success: function(list){
<<<<<<< HEAD
        console.log(list)
        $("#new-acts-view").html("");
        var $el = $("#stage");
        for (var model in list){
          var deed = list[model]
          var view = new NewHandsView();
=======
        $("#all-acts-view").html("");
        var el = $("#all-acts-view");
        for (var model in list){
          var deed = list[model]
          var view = new NewHandsView()
>>>>>>> parent of d461071... renders new list with upvote buttongit push
          view.render(deed);
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
        console.log(list)
        $("#hot-acts-view").html("");
        var $el = $("#stage");
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
    data: { hand: {title: summary, message: content, lat: latitude, long: longitude}, authenticity_token: token },
    success: function(){
      console.log("data added successfully!");
    }
  });
  getHotDeeds();
  getNewDeeds();
}


  var reader = new FileReader();
  var dataToUpload = {};
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

//=================================

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
