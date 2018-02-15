$(document).ready(function() {

  var apiPart1 = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";

  var searchURL = "";

  $(document).on('click', "#button", function() {

    $("#brain").css("display", "none");

    searchURL = $("#search").val();

    if (searchURL == "") {
      $(location).attr('href', "https://en.wikipedia.org/wiki/Special:Random");
        
    } else {

      searchURL = encodeURIComponent(searchURL);
      var fullCallUrl = "https://cors-anywhere.herokuapp.com/" + apiPart1 + searchURL + "&format=json";

      var call = $.get(fullCallUrl);

      call.done(function(data) {

        $(".all-content").html("");

        for (var i = 0; i < 10; i++) {
          var title = data.query.search[i].title;
          title = encodeURIComponent(title);
          var link = "https://en.wikipedia.org/wiki/" + title;
          $(".all-content").append('<a href="' + link + '">' + '<div class="content"><div class="title">' + data.query.search[i].title + '</div> <div class="snippet">' + data.query.search[i].snippet + '</div></div></a>');

        }

      });

    }

  });

  $("#search").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#button").click();
    }
  });
});