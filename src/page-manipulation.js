(function($){

  $(".layout__slot:nth-child(1)").attr("id","calendar-list");
  $(".layout__slot:nth-child(2)").attr("id","app-list");
  $(".layout__slot:nth-child(3)").attr("id","activity-list");
  $(".layout__slot:nth-child(4)").attr("id","tweets-list");
  $(".layout__slot:nth-child(4)").attr("id","tweets-list");
  
  var appList = $("#app-list")
  
  appList.prependTo(appList.parent())
  appList.removeClass();
  
  var activityList = $("#activity-list")
  activityList.find(".notification li").on("click",function(e){
    var $this = $(this);
    if($this.prop("tagName") == "A"){
      return;
    }
    $(this).find("a").click();
  });
  
})(jQuery)
