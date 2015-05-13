
//=======================================MODELS
var handModel = Backbone.Model.extend({
  initialize: function(){
    console.log('hey, a file is here!')
  }
});

//=======================================COLLECTIONS
var cardList = Backbone.Collection({
  model: cardModel,
  url: '/handsapi',
  initialize: function() {
    console.log("Collection is a go!");
  }
});
