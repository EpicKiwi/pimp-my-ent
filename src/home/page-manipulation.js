(function($) {
  //Storages
  var pinnedActivities = [];

  //Utils functions
  function setActivities() {
    var activities = activityList.find(".notification li");
    activities.removeClass("chidden");
    if (!activityList.hasClass("fullList")) {
      for (var i = 7; i < activities.length; i++) {
        $(activities.get(i)).addClass("chidden");
      }
      $("#activity-list-full-btn").addClass("chidden");
      $("#activity-list-expand-btn a").text("Tout afficher");
    } else {
      $("#activity-list-full-btn").removeClass("chidden");
      $("#activity-list-expand-btn a").text("Cacher");
    }
  }

  function getStorage() {
    var selectedStorage = null;
    if (typeof browser !== "undefined") {
      selectedStorage = browser.storage.sync;
      if (!selectedStorage) selectedStorage = browser.storage.local;
    } else if (typeof chrome !== "undefined") {
      selectedStorage = chrome.storage.sync;
      if (!selectedStorage) selectedStorage = chrome.storage.local;
    }
    return selectedStorage;
  }

  function savePinnedActivities() {
    var selectedStorage = getStorage();
    selectedStorage.set({ "pinned-activities": pinnedActivities });
  }

  function loadPinnedActivities(callback) {
    var selectedStorage = getStorage();

    var finishedCallback = function(data) {
      if (data["pinned-activities"]) {
        pinnedActivities = data["pinned-activities"];
      }
      return callback(pinnedActivities);
    };

    if (typeof browser !== "undefined") {
      selectedStorage.get("pinned-activities").then(finishedCallback);
    } else if (typeof chrome !== "undefined") {
      selectedStorage.get("pinned-activities", finishedCallback);
    }
  }

  function pinActivity(pinnedObject) {
    var $activity = $("#activity-" + pinnedObject.hash);
    $activity.addClass("pinned");
    $activity.prependTo($activity.parent());
  }

  String.prototype.hashCode = function() {
    var hash = 0,
      i,
      chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  function getActivityHash(activity) {
    var title = activity.find(".resume strong a").text();
    var author = activity.find(".auteur").text();
    var date = activity.find(".date").text();
    return (title + author + date)
      .hashCode()
      .toString()
      .replace(/-/g, "k");
  }

  //Events and iterators functions

  function onEachActivity() {
    var $this = $(this);
    var hash = getActivityHash($this);
    $this.attr("id", "activity-" + hash);
    $this.attr("data-hash", hash);
    $this.prepend(
      '<a href="#" class="activity-pin"><i class="fa fa-thumb-tack"></i></a>'
    );
  }

  function initOnEachActivityBroadcast(el) {
    var $this = $(broadcastsActivity.get(el));
    var $title = $this.find(".titre");
    var title = $title.text();
    $title.text("Annonce");
    $this
      .find(".vignette_deco2")
      .prepend(
        '<div class="resume"><strong><a hre="#">' +
          title +
          "</a></strong></div>"
      );
    $this.find(".vignette_deco2 .auteur").text("Annonce d'administration");
  }

  function onClickActivity(e) {
    if ($(e.target).is("a") || $(e.target).is("a *")) return;
    var link = $(this)
      .find("strong a")
      .attr("href");
    if (link) window.location = link;
  }

  function onClickPinActivity(e) {
    e.preventDefault();
    var activity = $(this).parent();
    var pinned = pinnedActivities.find(function(el) {
      return el.hash == activity.attr("data-hash");
    });
    if (pinned) {
      activity.removeClass("pinned");
      if (pinned.before) {
        activity.insertBefore($("#activity-" + pinned.before));
      } else {
        activity.appendTo(activity.parent());
      }
      pinnedActivities.splice(pinnedActivities.indexOf(pinned), 1);
    } else {
      pinned = {
        hash: activity.attr("data-hash"),
        before: activity.next().attr("data-hash")
      };
      pinnedActivities.push(pinned);
      pinActivity(pinned);
    }
    savePinnedActivities();
  }

  function onClickExpandActivity(e) {
    e.preventDefault();
    activityList.toggleClass("fullList");
    setActivities();
  }

  //INIT

  $(".layout__slot:nth-child(1)").attr("id", "calendar-list");
  $(".layout__slot:nth-child(2)").attr("id", "app-list");
  $(".layout__slot:nth-child(3)").attr("id", "activity-list");
  $(".layout__slot:nth-child(4)").attr("id", "tweets-list");
  $(".layout__slot:nth-child(5)").attr("id", "campus-post-list");
  $(".layout__slot:nth-child(6)").attr("id", "school-post-list");

  var appList = $("#app-list");
  appList.prependTo(appList.parent());
  appList.removeClass();

  var tweetsList = $("#tweets-list");
  tweetsList.appendTo(tweetsList.parent());
  tweetsList.removeClass();

  var activityList = $("#activity-list");
  var broadcastsActivity = activityList
    .find(".notification li .vignette_deco .icon-chat")
    .parent()
    .parent();
  broadcastsActivity.each(initOnEachActivityBroadcast);

  var activities = activityList.find(".notification li");
  activities.on("click", onClickActivity);
  activities.each(onEachActivity);
  activities.find(".activity-pin").on("click", onClickPinActivity);

  var oldActivityBox = activityList.find(".card__lien");
  oldActivityBox.attr("id", "activity-list-full-btn");
  activityList
    .find(".carte-activite")
    .append(
      '<div class="card__lien" id="activity-list-expand-btn"><a href="#">Tout afficher</a></div>'
    );

  $("#activity-list-expand-btn").on("click", onClickExpandActivity);
  setActivities();

  loadPinnedActivities(function(data) {
    pinnedActivities.forEach(function(el) {
      pinActivity(el);
    });
  });
})(jQuery);
