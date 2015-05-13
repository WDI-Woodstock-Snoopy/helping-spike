var handsView = Backbone.View.extend({

  tagName: "li",
  className: "",
  template: _.template($("#hand-item").html()),
  render: function(data) {
    var html = this.template(data);
    this.$el.html(html);
    $("#all-acts-view").append(this.$el);
  }

});
