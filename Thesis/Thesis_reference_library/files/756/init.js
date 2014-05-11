   jQuery.fn.doc2docWidget.setOptions({
      source: {
        url: "http://doc2doc.bmj.com/server/open.js",
        callback: "displayDiscussions"
      },
      extraCSSRules: ".doc2docwidget{font-size:12px !important;} .d2dw-link img{float:none !important;margin:0 !important;}",
      maxItems: 10
    });


$(function() {

populateElement('#search', 'Search BMJ Group site');


/* Latest from BMJ.com widget displaying drug related headlines */
var widget1 = new widget(
{

  'widget'  :  "feeds-widget1",
  'url'  :  "http://feeds.bmj.com/bmjj/jobs/genitourinarysti", 
  'track'  :  "w_sti_careers",
  'widget_title'  :  "BMJ Careers - Latest Genitourinary jobs",  
  'style'  :  "bmjjournals",  
  'num_itmes':  "5"
});

var stiwidget1 = new widget(
{

  'widget'  :  "journal-widget",
  'url'  :  "http://blogs.bmj.com/sti/feed/", 
        'jurl': "http://group.bmj.com/feed2json/indexc.php",
  'track'  :  "w_sti_blog_2ndcol",
  'widget_title'  :  "Latest from STI blog",  
  'style'  :  "bmjjournals",  
  'num_itmes':  "5"
});


var panel1 = new tabbedwidget(
{
  'widget'  :  "panel-1",
  'url'  :  "http://sti.bmj.com/rss/ahead.xml",
  'track'  :  "w_sti_ahead_tab",
  'widget_title'  :  "Online first",
  'style'  :  "bmjjournals",
  'num_items':  "20"
});

var panel2 = new tabbedwidget(
{
  'widget'  :  "panel-2",
  'url'  :  "http://sti.bmj.com/rss/current.xml",
  'track'  :  "w_sti_current_tab",
  'widget_title'  :  "Current issue",
  'style'  :  "bmjjournals",
  'num_items':  "20"
});

var panel3 = new tabbedwidget(
{
  'widget'  :  "panel-3",
  'url'  :  "http://sti.bmj.com/rss/mfr.xml",
    'description' : "The list below shows the most frequently read articles last month, of those  " +
      "published in the last 12 months. ",
  'track'  :  "w_sti_top10_tab",
  'widget_title'  :  "Top ten articles last month",
  'style'  :  "bmjjournals",
  'num_items':  "20"
});

var panel4 = new tabbedwidget(
{
  'widget'  :  "panel-4",
  'url'  :  "http://feeds.feedburner.com/sti/blogs",
  'track'  :  "w_sti_blog_tab",
  'widget_title'  :  "STI Blog",
  'style'  :  "bmjjournals",
  'num_items':  "20"
});

var panel5 = new widget(
{
  'widget'  :  "panel-5",
  'url'  :  "http://podcasts.bmj.com/sti/feed/",
  'track'  :  "w_sti_podcast_tab",
  'widget_title'  :  "STI Podcasts",
  'style'  :  "bmjjournals",
  'num_items':  "20"
});

var panel6 = new tabbedwidget({
    'widget'  : "panel-6",
    'url' : "http://resources.bmj.com/rss/sti-toprated.rss",
 'description' : "The list below shows the most highly rated articles last month, as voted  " +
      "by users of the thumbs up/thumbs down rating system at the side of papers. ",
    'track' : "w_sti_toprated_tab",
    'widget_title'  : "Top rated",
    'style' : "bmjjournals",
    'num_items':  "20"
  });

var panel7 = new tabbedwidget(
{
  'widget'  :  "panel-7",
  'url'  :  "http://group.bmj.com/feeds/bmjj/open/bmj-sti-open.xml",
 'description' : "This list contains<a href='http://sti.bmj.com/site/about/guidelines.xhtml#open'> Open Access </a>  articles from STI and relevant articles from <a href='http://bmjopen.bmj.com'>BMJ Open</a>. All are freely accessible.",

  'track'  :  "w_sti_open_tab",
  'widget_title'  :  "Open access",
  'style'  :  "bmjjournals",
  'num_items':  "20"
});


$("#tabbed-widget").tabs();

  var sidepanel1 = new tabbedwidget({
    widget:       "sidepanel1",
    url:          "http://blogs.bmj.com/sti/feed/",
    jurl:         "http://group.bmj.com/feed2json/indexc.php",
    track:        "w_sti_blog_sidetab",
    style:        "bmjjournals",
    num_items:    "4",
    num_columns:  1
  });
  var sidepanel2 = new tabbedwidget({
    widget:       "sidepanel2",
    url:          "http://podcasts.bmj.com/sti/feed/",
    track:        "w_hsti_podcasts_sidetab",
    style:        "bmjjournals",
    num_items:    "4",
    num_columns:  1
  });
  var sidepanel3 = new tabbedwidget({
    widget:       "sidepanel3",
    url:          "http://sti.bmj.com/rss/ahead.xml",
    track:        "w_heart_ahead_sidetab",
    style:        "bmjjournals",
    num_items:    "4",
    num_columns:  1
  });
$("#tabbed-side-widget").tabs();


  /* Rating widget code for articles */
  if ($("meta[name=citation_doi]").length > 0) {

    var username = $.trim($("#background .username").text());

    //if (username == "BMJ Maintenance" || username == "BMJJournals Maint User") {

      // Use citation DOI for unique id, mijd for response url.
      var doi = $("meta[name=citation_doi]").attr("content"),
        mijd = $("meta[name=citation_mjid]").attr("content");

      //var server = "http://stickleback.internal.bmjgroup.com:8080";
      var server = "http://ratingwidget.services.bmj.com";

      var baseUrl = server + "/ratingwidget/rate.html?articleId=" + encodeURIComponent(doi),
        responseUrl = "/letters/submit/" + mijd;
      //console.info(baseUrl);
      //console.info(responseUrl);

      var rwCookieItems = getCookie("RWV") != null ? getCookie("RWV").split("|") : [];

      function displayScores(data, totalsAbove) {
        data = data || { positive: 0, negative: 0 };
        var positivePercent = 100;

        if (data.positive == 0) {
          positivePercent = 0;
        }
        else if (data.negative > 0) {
          positivePercent =  Math.round((data.positive / (data.positive + data.negative)) * 100);
        }

        var $scores = $("<table class='result-graph'></table>");

        if (totalsAbove) {
          $scores
            .append("<tr><th colspan='2'>Likes: " + data.positive + " Dislikes: " + data.negative + "</th></tr>")
            .append("<tr><td title='Likes: " + data.positive + "' class='positive' width='" + positivePercent + "%'></td>" +
              "<td title='Dislikes: " + data.negative + "' class='negative' width='" + (100 - positivePercent) + "%'></td></tr>");
        }
        else {
          $scores
            .append("<tr><td title='Likes: " + data.positive + "' class='positive' width='" + positivePercent + "%'></td>" +
              "<td title='Dislikes: " + data.negative + "' class='negative' width='" + (100 - positivePercent) + "%'></td></tr>")
            .append("<tr><th colspan='2' style='padding-top: 6px'>Likes: " + data.positive + " Dislikes: " + data.negative + "</th></tr>");
        }

        if (data.positive == 0 && data.negative == 0) {
          $scores
            .find("td")
              .removeClass("negative")
              .removeClass("positive")
              .css({
                height: "10px",
                backgroundColor: "#aaa"
              });
        }

        return $scores;
      }

      function getThumbs(enabled) {
        if (enabled) {
          return $("<table class='thumbs'><tr></tr></table>")
            .find("tr")
              .append("<td class='thumb'><span class='thumb-rating-up'></span><a title='I like this'>I like this</a></td>")
              .append("<td class='thumb'><span class='thumb-rating-down'></span><a title='I don\'t like this'>I don't like this</a></td>")
            .end();
        }
        else {
          return $("<table class='thumbs'><tr></tr></table>")
            .find("tr")
              .append("<td class='thumb disabled'><span class='thumb-rating-up'></span>I like this</td>")
              .append("<td class='thumb disabled'><span class='thumb-rating-down'></span>I don't like this</td>")
            .end();
        }
      }

      var url = baseUrl + "&callback=?";

      $.getJSON(url, function(data) {

        $("#article-cb-main")
          .after("<div id='rating-widget-cb' class='content-box' style='display: block;'><div class='cb-contents'>" +
            "<h3 class='cb-contents-header'><span>Rate this article</span></h3>" +
            "<div id='rating-widget' class='cb-section'></div></div></div>");


        if (jQuery.inArray(doi, rwCookieItems) != -1) {
          $("#rating-widget")
            .append(displayScores(data, true));

          $("<div id='rating-widget-cb-2'></div>")
            .append(getThumbs(false))
            .append(displayScores(data, true))
            .appendTo("#content-block");
        }
        else {
          $("#rating-widget")
            .append("<h6>What do you think of this article?</h6>")
            .append(getThumbs(true));

          $("#rating-widget").append(displayScores(data, false));

          $("<h2>Rate this article</h2>")
            .appendTo("#content-block");
          $("<div id='rating-widget-cb-2'></div>")
            .append(getThumbs(true))
            .append(displayScores(data, true))
            .appendTo("#content-block");

          $(".thumb")
            .click(function(target) {
              var score = $(this).children("span").hasClass("thumb-rating-down") ? -1 : 1,
                url  = baseUrl + "&articleScore=" + score + "&callback=?";

              rwCookieItems.push(doi);

              jQuery.getJSON(url, function(data) {
                setCookie("RWV", rwCookieItems.join("|"));

                $("#rating-widget")
                  .children("table, h6")
                    .remove()
                    .end()
                  .prepend(displayScores(data, true));

                $("#rating-widget-cb-2")
                  .empty()
                  .append(getThumbs(false))
                  .append(displayScores(data, true));

              });
            });
        }

        $("#rating-widget, #content-block")
          .append("<p style='padding: 10px 0 0; clear: left;'><a href='" + responseUrl + "'>Tell us why you like/don't like this article</a></p>");
      });

   // }
  }

});