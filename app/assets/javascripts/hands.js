var reader = new FileReader();
var dataToUpload = {};
var imageFile;
var currentViewNew;
var currentViewHot;

//WHEN THE DOCUMENT IS READY....SHOW THE FORM AND ALLOW USER TO SUBMIT CONTENT.
$(document).ready(function(){
  getCoords();
  currentViewNew = true;
  getNewDeeds();
  createmap();

  $("#new-tab").click(function(){
    getNewDeeds();
    currentViewNew = true;
    $("#new-tab").css("color", "#33C3F0")
    $("#hot-tab").css("color", "black")
    console.log(currentViewNew);
  })

  $("#hot-tab").click(function(){
    getHotDeeds();
    currentViewNew = false;
    $("#hot-tab").css("color", "#33C3F0")
    $("#new-tab").css("color", "black")
    console.log(currentViewNew);
  })

  $("#hot-tab").hover(function(){

    console.log(currentViewNew);
  })

  $('#file').on('focusout', function() {

    reader.onload = function (event) {
      try {
        console.log(event.target.result);
          dataToUpload.file = event.target.result;
      } catch (ex) {
          throw new Error("Error Error");
      }
    }

    var file = document.getElementById('file');

    reader.readAsDataURL(file.files[0]);
  });
  imageFile = dataToUpload.file;

  $( "#new_hand" ).hide();

  $("#share-something-form-toggle").click(function(){
    $( "#new_hand" ).slideToggle(500);
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
  $( "#new_hand" ).slideToggle(500);

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
        // console.log(list)
        $("#hand-stage").empty()
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
        $("#hand-stage").empty()
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
var contentString;

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

    }
  });
  if(currentViewNew==false){
    getHotDeeds();
  }
  else {
    getNewDeeds();
  }
}

function createmap(){
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.893974, -87.627945], 14);
    map.zoomControl.setPosition('bottomleft');

    $.ajax({
        method: 'get',
        url: '/api',
        dataType: 'json',
        })
      .done(function(data){
        console.log(data)

        for (var i = 0; i < data.length; i++) {
          console.log(data[i].lat, data[i].long)
          var marker = new L.Marker(new L.LatLng(data[i].lat, data[i].long));
          map.addLayer(marker);
            marker.on('click', function(e) {
             var tooltip = new mapboxgl.Popup()
                .setLatLng(map.unproject(e.point))
                .setHTML('<h1>Hello World!</h1>')
                .addTo(map);
          });
        }
      });
}
