/**
 * @projectDescription Standalone version of widget code for embedding.
 * @author             James Skinner
 * @version            0.1
 */

(function() { // closure to prevent namespace pollution

  /**
   * Processes a Trimpath template against a data object and returns the result.
   * @param {String} tmpl Trimpath template definition
   * @param {Object} data Data to pass to the template.
   * @return {String} Output of template execution
   */
  function doTemplate(tmpl, data) {
    var tt = TrimPath.parseTemplate(tmpl);
    return tt.process(data);
  }

  /**
   * Simpler function which allows us to get data from any server by
   * wrapping it in a Javascript function
   * @param {Object} opt Widget options object.
   * @param {Function} callback Method to pass final discussion list to.
   */
  function loadFeedFile(opt, callback) {
    window[opt.source.callback || "displayRecent"] = function(data) {
      var disclist = data.slice(0, opt.maxItems);
      if (opt.debug) {
        if (disclist.length > 0) {
          console.dir(disclist);
        }
        else {
          console.warn("No discussions found!");
        }
      }
      callback(disclist);
    }

    var url = opt.source.url + "?callback=?";
    jQuery.getJSON(url, function(d) { });
  }


  /**
   * Default set of styles to add to the document.
   */
  var defaultStyles = [
    // overall widget styling
    ".doc2docwidget { margin: 2px; padding: 12px 8px 4px; background: url(http://doc2doc.bmj.com/images/bg-widget-groups.gif) repeat-x top; ",
    "   color: #666; font: bold 1em Arial,sans-serif; line-height: 1.4em; }",
    ".doc2docwidget a { text-decoration: none; } .doc2docwidget a:hover { text-decoration: underline; }",
    ".doc2docwidget * { margin: 0; padding: 0; border: none; }",
    // title, blurb and logo
    ".doc2docwidget .d2dw-header { margin: 2px 0 4px; min-height: 40px; background: url(http://doc2doc.bmj.com/images/logo-smalltrans.png) top right no-repeat; }",
    ".doc2docwidget .d2dw-header h4 { color: #009AF6; font-size: 1.4em; }",
    // link to doc2doc
    ".doc2docwidget .d2dw-link { padding-top: 4px; text-align: right; background: url(http://doc2doc.bmj.com/images/border-h.gif) top repeat-x; }",
    ".doc2docwidget .d2dw-link a { color: #00447e; }",
    // list of discussions
    ".doc2docwidget .d2dw-items { padding-left: 6px; font-size: 0.9em; font-weight: normal; }",
    ".doc2docwidget .d2dw-item { padding: 3px 6px; } .doc2docwidget .d2dw-item a { color: #333; }",
    ".doc2docwidget .d2dw-alt { background-color: #f6f6f6; }"
  ].join("\n");

  /**
   * A very basic template for generating the main body of the widget.
   */
  var defaultWidgetTemplate =
    "<div class='doc2docwidget'>" +
    "  <div class='d2dw-header'>{header}</div>" +
    "  <div class='d2dw-items'><div style='height: 48px; background: url(http://doc2doc.bmj.com/images/indicator.gif) center no-repeat;'></div></div>" +
    "  <div class='d2dw-link'>{footer}</div>" +
    "</div>";

  /**
   * A very basic template for generating the list of items within the widget.
   */
  var defaultWidgetItemsTemplate = "<div class='d2dw-item'><a href='{URL}'>{TITLE}</a></div>";

  /**
   * Basic templates header and footer content.
   */
  var defaultWidgetHeaderContent = "<h4>Latest discussions on doc2doc</h4><div>The BMJ's clinical community</div>";
  var defaultWidgetFooterContent = "<a href='http://doc2doc.bmj.com/forumhome.html'>More discussions <img src='http://doc2doc.bmj.com/images/bg-more.png' /></a>";

  /**
   * Default options for widget, gets overriden by properties of object passed
   * to jQuery.fn.doc2docWidget()
   */
  var defaultOptions = {
    // Url of script file containing list of discussions from doc2doc, and name
    // of the callback function that the script will call.
    source: {
      url: "http://doc2doc.bmj.com/server/recent.js",
      callback: "displayRecent"
    },

    // Template strings for widget body, header, footer and list of discussions inside.
    bodyTemplate: defaultWidgetTemplate,
    itemTemplate: defaultWidgetItemsTemplate,
    headerContent: defaultWidgetHeaderContent,
    footerContent: defaultWidgetFooterContent,

    // Contains default CSS rules for widgets, can be overriden.
    defaultCSSRules: defaultStyles,

    // If true a style tag is generated from the value of defaultStyles and
    // inserted before the widget itself.
    addDefaultCSS: true,

    // This is added to the end of the <style> tag for the widget.
    extraCSSRules: "",

    // Maximum number of discussions to show.
    maxItems: 8,

    // Whether to show debugging info
    debug: false
  };

  /**
   * Include a new doc2doc widget inside the selected node(s), can take
   * an optional object to override default settings.
   * @param {Object} options Property bag for overriding default options.
   */
  jQuery.fn.doc2docWidget = function() {
    var self = this, opt = jQuery.fn.doc2docWidget.options;
    //jQuery.extend({}, defaultOptions, options);

    // Insert default styles if options.addDefaultCSS is true or
    // options.extraCSSRules has content.
    if (opt.addDefaultCSS || (opt.extraCSSRules && opt.extraCSSRules.length)) {
      var rules = (opt.addDefaultCSS ? opt.defaultCSSRules : "")
        + "\n" + opt.extraCSSRules + "\n";
      jQuery(this).append("<style type='text/css'>" + rules + "</style>");
    }

    // Build widget body on element.
    jQuery(this).append(opt.bodyTemplate
                          .replace("{header}", opt.headerContent)
                          .replace("{footer}", opt.footerContent));

    if (opt.debug) {
      console.dir(opt);
    }

    // Load JSON source file to get an array of doc2doc discussion objects, and
    // then use those to generate the list of discussions inside the widget.
    loadFeedFile(opt,
      function(discussions) {  // callback function
        jQuery(".d2dw-items", self)
          .empty()
          .each(function() {
            var $el = jQuery(this);

            for (var i = 0; i < discussions.length; i++) {
              var cur = discussions[i];
              var html = opt.itemTemplate
                .replace("{URL}", cur.DiscussionUrl + "&q=w_")
                .replace("{TITLE}", cur.DiscussionTitle);
              $el.append(html);
            }
          })
          .find(".d2dw-item:even")
            .addClass("d2dw-alt");
      });

    return this;
  }

  jQuery.fn.doc2docWidget.options = jQuery.extend({}, defaultOptions);

  /**
   * Overrides the current settings for the doc2doc widget using
   * the supplied object's key:value pairs.
   * @param {Object} options Property bag with new options.
   * @return {Object} Updated options for the widget.
   */
  jQuery.fn.doc2docWidget.setOptions = function(options) {
    jQuery.extend(jQuery.fn.doc2docWidget.options, options);
    //jQuery.bmj.log("doc2docWidget: new options = " + jQuery.fn.doc2docWidget.options.toString());
    return jQuery.fn.doc2docWidget.options;
  }

  /*
   * On page load look for element with id='doc2doc-widget' and append the widget to that.
   */
  jQuery(function() {
    jQuery("#doc2doc-widget").doc2docWidget();
  });

})(); // end closure
