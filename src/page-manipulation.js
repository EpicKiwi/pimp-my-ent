(function($){

  $(".layout__slot:nth-child(1)").attr("id","calendar-list");
  $(".layout__slot:nth-child(2)").attr("id","app-list");
  $(".layout__slot:nth-child(3)").attr("id","activity-list");
  $(".layout__slot:nth-child(4)").attr("id","tweets-list");
  $(".layout__slot:nth-child(4)").attr("id","tweets-list");
  
  var appList = $("#app-list")
  
  appList.prependTo(appList.parent())
  appList.removeClass();
  
  var activityList = $("#activity-list");
  var broadcastsActivity = activityList.find(".notification li .vignette_deco .icon-chat").parent().parent();
  broadcastsActivity.each(function(el){
      var $this = $(broadcastsActivity.get(el));
      var $title = $this.find(".titre");
      var title = $title.text();
      $title.text("Annonce");
      $this.find(".vignette_deco2").prepend("<div class=\"resume\"><strong><a hre=\"#\">"+title+"</a></strong></div>");
      $this.find(".vignette_deco2 .auteur").text("Annonce d'administration")
  });
  
})(jQuery);
