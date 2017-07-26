//JQuery est déjà chargé sur la page
(function($){
  
  //URL de la feuille de style CSS
  var cssurl = "https://raw.githubusercontent.com/EpicKiwi/pimp-my-ent/master/src/style.css";
  //USR du script javascript
  var jsurl = "https://raw.githubusercontent.com/EpicKiwi/pimp-my-ent/master/src/page-manipulation.js";
  
  //Chargement asynchrone du JS
  $.ajax({
    url: jsurl,
    cache: false
  }).done(function(data){
    $("body").append("<script>\n"+data+"\n</script>")
    console.info("Custom JS loaded")
  }).fail(function(){
    console.error("Unable to load custom JS",jsurl)
  })
  //Chargement asynchrone du CSS
  $.ajax({
    url: cssurl,
    cache: false
  }).done(function(data){
    $("head").append("<style>\n"+data+"\n</style>")
    console.info("Custom CSS loaded")
  }).fail(function(){
    console.error("Unable to load custom CSS",cssurl)
  })
  
})(jQuery)
