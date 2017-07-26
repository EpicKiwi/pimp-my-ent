//JQuery est déjà chargé sur la page
(function($){
  
  //URL de la feuille de style CSS
  var cssurl = "https://gist.githubusercontent.com/EpicKiwi/05fd06032d0a66a61b7fe85980412038/raw/a722e65eae684d8d40b3617c128d25661aad37c1/newstyle.css";
  //USR du script javascript
  var jsurl = "https://gist.githubusercontent.com/EpicKiwi/05fd06032d0a66a61b7fe85980412038/raw/a722e65eae684d8d40b3617c128d25661aad37c1/newstyle.css";
  
  //Chargement asynchrone du JS
  $.ajax({
    url: jsurl,
    cache: false
  }).done(function(data){
    $("body").append("<script>\n"+data+"\n</script>")
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
