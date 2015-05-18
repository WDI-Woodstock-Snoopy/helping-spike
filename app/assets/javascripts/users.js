// // # Place all the behaviors and hooks related to the matching controller here.
// // # All this logic will automatically be available in application.js.
// // # You can use CoffeeScript in this file: http://coffeescript.org/
// //submit = 5 points
// //upvote = 1 point

//AJAX REQUEST TO CREATE MARKERS
// function renderMarkers(mapName){
//   $.ajax({
//       method: 'get',
//       url: '/api',
//       dataType: 'json',
//       })
//     .done(function(data){
//       console.log(data)
//
//       for (var i = 0; i < data.length; i++) {
//         marker = new google.maps.Marker({
//           position: new google.maps.LatLng(data[i].lat, data[i].long),
//           map: mapName
//         });
//       //var contentString = "hello my name is gaby !!!!!!";
//       infowindow = new google.maps.InfoWindow({
//           content: contentString
//       });
//
//       google.maps.event.addListener(marker, 'click', (function(marker, i) {
//         var contentString = '<div class="info-window">' + "<p>" + data[i].title + "</br>" + data[i].message + "</p>" +'</div>';
//         return function() {
//           infowindow.setContent(contentString);
//           infowindow.open(mapName, marker);
//         }
//       })(marker, i));
//         // var contentString = '<div class="info-window">' + "<p>" + data[i].title +'</div>';
//         //   infowindow.setContent(contentString);
//         //   infowindow.open(mapName, marker);
//     };
//   });
// }
//
//
// // //CREATE MAP THAT IS CENTERED ON Chicago
//
// var map;
//
// function initializeLargeMap(){
//   var defaultCenter = new google.maps.LatLng(41.893974, -87.627945);
//   var defaultOptions = {
//     zoom: 14,
//     center: defaultCenter,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   }
//   largeMap = new google.maps.Map(document.getElementById("largeMap"), defaultOptions);
//
//   renderMarkers(largeMap);
// }
//
// google.maps.event.addDomListener(window, 'load', initializeLargeMap);
//
