/**
 * All BMJ Group custom jQuery functions should be added here
 *
 * @author dberhane
 * @author jskinner
 */

$(function() { /* A jQuery Google Analytics extensions which adds support for outbound links, mailto and downloads */

  $('a').click(function() {
    var $a = $(this),
      href = $a.attr('href');

    if (href.match(/^\/cgi\/powerpoint/)) { /* HighWire specific to track powerpoint downloads */
        href = href + ".ppt";
    }

    var hrefArray = href.split('.');
    var extension = hrefArray[hrefArray.length - 1];

    var fileTypes = ['doc', 'zip', 'xls', 'ppt', 'xml', 'pdf', 'mp3'];

    // see if the link is external
    if ((href.match(/^http/)) && (!href.match(document.domain))) {
        // if so, register an event
        var category = 'outgoing'; // set this to whatever you want
        var event = 'click'; // set this to whatever you want
        var label = href; // set this to whatever you want
        pageTracker._trackEvent(category, event, href);
    }

    // see if the link is mailto
    if (href.match(/^mailto/)) {
        // if so, register an event
        var category = 'mailto'; // set this to whatever you want
        var event = 'click'; // set this to whatever you want
        var label = href; // set this to whatever you want
        pageTracker._trackEvent(category, event, href);
    }

    // for type downloads
    if ($.inArray(extension, fileTypes) != -1) {
        pageTracker._trackEvent('download', extension, href);
    }
  });
});


/**
 * A function which populates a search form-field with a default text for thehe Group and
 * local site search (Added by D. Berhane)
 *
 * The first parameter is a selector (for BMJ Group search, it is "#groupSearchGadget"), the
 * second parameter is the default value of that input element e.g. " Search all BMJ Products".
 */
function populateElement(selector, defvalue) {
  if ($.trim($(selector).val()) == "") {
    $(selector).val(defvalue);
  }

  $(selector)
    .focus(function() {
      if ($(selector).val() == defvalue) {
          $(selector).val("");
      }
    })
    .blur(function(){
      if ($.trim(jQuery(selector).val()) == "") {
          $(selector).val(defvalue);
      }
    });
};


/**
 * A function which open a pop-up window for OOP registration when the there is a refrence
 * 'rel="external" with the A tag'
 */
function popUp() {
  $('A[rel="external"]').click(function() {
    window.open($(this).attr('href'), '', 'status=yes,scrollbars=yes,resizable=yes,width=700,height=550');
    return false;
  });
}

/**
 * A custom made flowplayer for video and audio
 */
function mediaplayer(media, player, autoplay) {
  if (media == "video") {
      mtrack = "Video";
  }
  else {
      mtrack = "Audio";
  }

  if (!player) {
      player = "#player";
  }

  $(player).flowplayer("http://group.bmj.com/media/flowplayer/flowplayer-3.1.0.swf", {
    plugins: {
      controls: {
          fullscreen: media == "video"
      }
    },
    clip: {
      autoPlay: !!autoplay,

      onBegin: function(clip) {
          pageTracker._trackEvent("Video", "Start", clip.url);
      },
      onResume: function(clip) {
          pageTracker._trackEvent("Video", "Resume", clip.url);
      },
      // track pause event for this clip. time (in seconds) is also tracked
      onPause: function(clip) {
          pageTracker._trackEvent("Video", "Pause", clip.url, parseInt(this.getTime()));
      },
      // track stop event for this clip. time is also tracked
      onStop: function(clip) {
          pageTracker._trackEvent("Video", "Stop", clip.url, parseInt(this.getTime()));
      },
      // track finish event for this clip
      onFinish: function(clip) {
          pageTracker._trackEvent("Video", "Finish", clip.url);
      }
    }
  });
}


/**
 *  Returns a function that creates a flowplayer instance based on
 *  a particular set of common options.
 */
function getFlowplayerInitialseFunc(options) {
  // Basic options passed when creating a new player that override
  // the defaults for flowplayer.
  var default_options = {
    plugins: {
      // See http://flowplayer.org/documentation/configuration/plugins.html#controlbar
      controls: {
        volume: false,
        mute: false
      }
    },

    playlist: [],

    // Options common to all clips, see defaults and documentation at
    // http://flowplayer.org/documentation/configuration/clips.html
    clip: {
      // Track player events and at what point within the video they occurred.
      onBegin: function(clip) {
        pageTracker._trackEvent("Audio", "Start", clip.url);
      },
      onResume: function(clip) {
        pageTracker._trackEvent("Audio", "Resume", clip.url);
      },
      onPause: function(clip) {
        pageTracker._trackEvent("Audio", "Pause", clip.url, parseInt(this.getTime()));
      },
      onStop: function(clip) {
        pageTracker._trackEvent("Audio", "Stop", clip.url, parseInt(this.getTime()));
      },
      onFinish: function(clip) {
        pageTracker._trackEvent("Audio", "Finish", clip.url);
      }
    },

    onStart: function() {
      //console.info("flowplayer.onStart has run!");
    }
  };

  options = $.extend(true, {}, default_options, options);

  // Return a function that will get called to insert a new instance of flowplayer
  // based on these options, with an individual target element and playlist, and
  // return the flowplayer instance.
  return function(target, playlist) {
    var $target = $(target),
      local_options = $.extend(true, {}, options);

    local_options.playlist = local_options.playlist.concat(playlist || []);

    return flowplayer(target, "http://group.bmj.com/media/flowplayer/flowplayer-3.1.0.swf", local_options);
  };

}

/**
 * Format a string by substituting variables, e.g.
 *
 *   fmt("hello '{0}', you are {1} today", "Bob", 13);
 *   fmt("hello '{name}', you are {age} today", { name: "Bob", age: 13 });
 *
 * both produce the string "hello 'Bob', you are 13 today"
 */
function fmt(src, data) {
  data = (typeof data == "object" && arguments.length == 2) ? data : $.makeArray(arguments).slice(1);
  return src.replace(/{([^{}]*)}/g, function(a, k) {
    return k in data ? String(data[k]) : a;
  });
}


function buildFeedItem(head, item) {
  item.target = head.target;

  var feed_html = "";

  if (item.source == "no" || item.source == "none" || item.source == "undefined") {
    if (item.section.length > 0) {
      feed_html += "<span class='sect1'>{section}:</span>";
    }
  }
  else {
    if ((item.source != undefined) && (head.display_source != "none")) {
      feed_html += "<span class='sect1'>{source}:</span>";
    }
  }

  feed_html += "<span class='title1'><a href='{link}' target='{target}'>{title}</a></span>";

  if (item.date) {
    feed_html += "&nbsp;<span class='date'>({date})</span>";
  }
  if (item.author) {
    feed_html += "&nbsp;<span class='author'>({author})</span>";
  }

  if (head.desc_len == "all") {
    feed_html += "<div class='feedDesc'>{description}</div>";
  }
  else if (item.description != "" && head.desc_len > 50) { // display description markup if enough content
    trunc = item.description.substring(0, head.desc_len);
    trunc = trunc.replace(/\w+$/, '');

    feed_html += "<div class='feedDesc'>{trunc}</div>";

    if (head.display_content == "yes") {
      item.ulink = item.link.match(/[^\?]+/);

      feed_html += "<div class='feedDesc' style='display: none;'>{content}<div class='postmetadata alt'>" +
        "<div class='category'>Posted in <a rel='category tag' title='View all posts in Students' href='http://blogs.bmj.com/bmj/category/students/'>Students</a>.</div>" +
        "<div class='email'><div class='button'><a rel='nofollow' title='Email This Post' href='{ulink}email/'>Email This Post</a></div></div>" +
        "<div class='response'><div class='button'><a href='{ulink}#comments' class='response'>Comments</a></div></div>" +
        "<div class='respond'><div class='button'><a href='{ulink}#respond' class='respond'>Respond</a><p>&nbsp;</p></div></div>" +
        "</div></div><br/>";

      $(".title1 a").live("click", function() {
        $(this).parent().siblings('.feedDesc').toggle("slow");
        return false;
      });
    }
  }

  if (item.encltype == "audio/mpeg") {
    feed_html += "<a class='player' href='{enclink}' style='display: block; width: 155px; height: 20px; margin-bottom: 8px;'>" +
      "<img src='http://group.bmj.com/media/movies/Masterclasses/play_small.png' alt='BMJ podcast' /></a>";
  }

  return fmt(feed_html, item);
}


function getFeedItems(options, data, itemcons) {
  var head = data.feedhead[0],
    items = data.items.slice(0, options.num_items);
  return $.map(items, function(item) {
    return buildFeedItem(head, item);
  });
}


function getItemList(listcons, itemcons, items, max) {
  var $list = $(listcons);

  $.each(items.splice(0, max > 0 ? max: 999), function(i, item) {
    $(itemcons)
      .appendTo($list)
      .append(item);
  });

  return $list;
}

/* Build POST data string for feed2json request */
function getParameters(options) {
  var url = [];
  for (var k in options) {
    if (k == "debug")
      continue;
    url.push(k + "=" + encodeURIComponent(options[k]));
  }
  return url.join("&");
}


/**
 * Default options for all widgets.
 */
var _common_default_args = {
  // Id of target element
  widget: "feeds-widget1",
  // CSS style to apply
  style: "bmj",
  // Widget title and optional blurb
  widget_title: "Latest from BMJ",
  description: "",
  // Number of items to display
  num_items: 5,
  // Target attr for links
  target: "_self",
  // Tracking code for links
  track: "widget_bmjblogs",
  // URL of widget's source feed
  url: "http://www.bmj.com/rss/recent.xml",
  // URL of feed2json converter service
  jurl: "http://group.bmj.com/feed2json/index.php",
  source: "no",
  // Section headings to parse
  section: "none",
  // Filter on categories
  category: "all",
  // Filter on subject collections
  subject: "all",

  display_source: "yes",
  // Length of item description to display (or 'all')
  desc_len: "0",

  // Show debugging info.
  debug: false
};


/**
 * Generates a widget from an RSS feed using our feed2json service to
 * get the feed without cross-domain issues and convert it to a JSON
 * response.
 */
function widget(options) {
  var default_args = $.extend({}, _common_default_args, {
    // display full content feed item
    display_content: "no",
    podcastlogo: "http://resources.bmj.com/repository/images/flowplayer-generic-image.jpg",
    expandplayer: "no"
  });

  this.options = options = $.extend({}, default_args, options);
  options.callback = options.widget.replace(/-/g, "_");

  if ($('div#' + options.widget).length == 0) {
    return
  }

  $.ajax({
    url: options.jurl,
    data: getParameters(options),
    cache: true,
    dataType: "script",
    success: window[options.callback] = function(data) {
      if (data == null) {
        return;
      }

      var head = data.feedhead[0],
        $widget = $('div#' + data.feedhead[0].widget),
        items = getFeedItems(options, data);

      $widget
        .empty()
        .addClass(head.style)
        .append('<h2>' + head.widget_title + '</h2>');

      if (options.description) {
        $widget.append("<div class='blurb'>" + options.description + "</div>");
      }

      getItemList("<ul class='StandardBullet'></ul>", "<li class='rss-item'></li>", items)
        .appendTo($widget)

      var insertPlayer = getFlowplayerInitialseFunc({
        plugins: {
          controls: {
            bufferColor:      '#006990',
            progressColor:    '#009AF6',
            buttonColor:      '#009AF6',
            buttonOverColor:  '#FF00FF',
            tooltipColor:     '#009AF6',
            //  width:        180,
            height:           20
          }
        }
      });

      $widget.find('ul a.player').live("click", function() {
        var $container = $(this),
          video_url = $container.attr("href"),
          player;
        //console.info("video_url: %s", video_url);

        player = insertPlayer(this, [
          { url: head.podcastlogo, scaling: "orig" },
          //{ url: video_url, autoBuffering: false }
          video_url
        ]);

        /* For expandable flowplayer with branded logo */
        if (head.expandplayer == "yes") {
          $container.addClass("expandplayer");

          $widget.find("ul li a").click(function() {
            $widget.find("ul li a").removeClass("expandplayer");
            $container.addClass("expandplayer");
            //console.log(current);
          });
        }

        player.load(function() {
          //console.info("flowplayer loaded");
        });
        return false
      });
    }
  });
}



/**
 * Widget which is displayed within a set of tabs and can
 * display data in two columns.
 */
function tabbedwidget(options) {
  var default_args = $.extend({}, _common_default_args, {
    widget: "tabbed-widget",
    // Number of columns to display
    num_columns: 2
  });

  this.options = options = $.extend({}, default_args, options);
  options.callback = options.widget.replace(/-/g, "_");

  if ($('div#' + options.widget).length == 0) {
    //if (console) console.warn("No element #" + options.widget + " found!");
    return;
  }

  $.ajax({
    url: options.jurl,
    data: getParameters(options),
    cache: true,
    dataType: "script",
    success: window[options.callback] = function(data) {
      if (data == null) {
        return;
      }

      var head = data.feedhead[0],
        $widget = $('div#' + head.widget).empty(),
        $listing,
        items = getFeedItems(options, data);

      if (options.wbox == 1) {
        /* for 1 column tabbed widgets */
        $('div#tabbed-widget').addClass(head.style);

        getItemList("<ul class='StandardBullet'></ul>", "<li class='rss-item'></li>", items)
          .appendTo($widget);
      }
      else {
        if (options.description) {
          $widget.append("<div class='blurb'>" + options.description + "</div>");
        }

        if (options.num_columns == 2) {
          getItemList("<div class='latestbox1'>", "<div class='feeditem'></div>", items, 10)
            .appendTo($widget);
          getItemList("<div class='latestbox2'>", "<div class='feeditem'></div>", items)
            .appendTo($widget);
        }
        else {
          getItemList("<ul class='StandardBullet'></ul>", "<li class='rss-item'></li>", items)
            .appendTo($widget);
        }
      }

      var insertPlayer = getFlowplayerInitialseFunc({
        plugins: {
          controls: {
            fullscreen:   false,
            bottom:       4,
            width:        155,
            height:       60
          }
        }
      });

      $widget.find('ul a.player').live("click", function(ev) {
        var player = insertPlayer(this);
        player.load(function() {
          //console.info("flowplayer loaded");
        });
        return false
      });

    }
  });

}
