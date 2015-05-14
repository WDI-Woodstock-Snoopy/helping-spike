//WHEN THE DOCUMENT IS READY....SHOW THE FORM AND ALLOW USER TO SUBMIT CONTENT.
$(document).ready(function(){

  getNewDeeds();
  getHotDeeds();
  heyYall();

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
  getNewDeeds();
  getHotDeeds();
  })

  //ANIMATIONS
  function clickHot(){
    $('#display-hot').click(function() {
      console.log("hot");
      $('#stage').empty();
      getHotDeeds();
    });
  }
  clickHot();

  function clickNew(){
    $('#display-new').click(function() {
      console.log("new");
      $('#stage').empty();
      getNewDeeds();
    });
  }
  clickNew();
})
