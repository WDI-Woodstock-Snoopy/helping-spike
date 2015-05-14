var NewHandsView = Backbone.View.extend({

  tagName: "li",
  className: "",
  template: _.template($("#hand-item").html()),
  render: function(data) {
    var html = this.template(data);
    this.$el.html(html);
  }

});


var HotHandsView = Backbone.View.extend({

  tagName: "li",
  className: "",
  template: _.template($("#hot-hand-item").html()),
  render: function(data) {
    this.data = data;
    var html = this.template(data);
    this.$el.html(html);
    this.delegateEvents();
  },
  events: {
    'click button.vote': 'sendVote'
  },
  sendVote: function(){
    var that = this;
    var token = $('#token').data('token');
    $.ajax({
      method: 'post',
      data: {authenticity_token: token},
      url: '/hands/' + this.data.id + '/like',
      dataType: 'json',
      success: function(data){
        that.$el.fadeOut(1000);
        that.$el.css({backgroundColor: 'lightblue'})
        getHotDeeds()
      }
    })
  }

});
