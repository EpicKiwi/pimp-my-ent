(function($){

  $(".layout__slot:nth-child(1)").attr("id","calendar-list");
  $(".layout__slot:nth-child(2)").attr("id","app-list");
  $(".layout__slot:nth-child(3)").attr("id","activity-list");
  $(".layout__slot:nth-child(4)").attr("id","tweets-list");
  $(".layout__slot:nth-child(5)").attr("id","campus-post-list");
  $(".layout__slot:nth-child(6)").attr("id","school-post-list");
  
  var appList = $("#app-list")
  appList.prependTo(appList.parent())
  appList.removeClass();
 
  var tweetsList = $("#tweets-list")
  tweetsList.appendTo(tweetsList.parent())
  tweetsList.removeClass();
  
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
  
  var activities = activityList.find(".notification li");
  activities.on("click",function(e){
    if($(e.target).is("a"))
      return;
    var link = $(this).find("strong a").attr('href');
    if(link)
     window.location = link;
  })
  
  var oldActivityBox = activityList.find(".card__lien");
  oldActivityBox.attr("id","activity-list-full-btn");
  activityList.find(".carte-activite").append("<div class=\"card__lien\" id=\"activity-list-expand-btn\"><a href=\"#\">Tout afficher</a></div>");

  $("#activity-list-expand-btn").on("click",function(e){
    e.preventDefault();
    activityList.toggleClass("fullList");
    setActivities();
  })

  setActivities();

  function setActivities(){
    var activities = activityList.find(".notification li");
    activities.removeClass("chidden");
    if(!activityList.hasClass("fullList")){
      for(var i = 7; i<activities.length; i++){
        $(activities.get(i)).addClass("chidden");
      }
      $("#activity-list-full-btn").addClass("chidden");
      $("#activity-list-expand-btn a").text("Tout afficher");
    } else {
      $("#activity-list-full-btn").removeClass("chidden");
      $("#activity-list-expand-btn a").text("Cacher");
    }
  }
  
})(jQuery);
