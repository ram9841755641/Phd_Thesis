var JcbVideo = {

    setupAllWhenReady: function(options) {
        JcbVideo.options = options;
        $(document).ready(JcbVideo.initialize);
    },

    initialize: function() {
        if (window.JcbVideoInitialized) {
            return;
        }
        window.JcbVideoInitialized = true;
        // Whether we're a supplemental material index or individual content
        // page.
        JcbVideo.suppMaterialData = $('div#pageid-data-supp').length > 0;
        if (!JcbVideo.suppMaterialData) {
            JcbVideo.suppMaterialData = $('h1.data-supp-article-title').length > 0;
        }
        JcbVideo.doi = $('meta[name="DC.Identifier"]').attr('content');
        if (!JcbVideo.doi || JcbVideo.doi.length == 0) {
            JcbVideo.doi = $('meta[name="DCTERMS.isPartOf"]').attr('content');
            if (!JcbVideo.doi || JcbVideo.doi.length == 0) {
                JcbVideo.doi = $.trim($('span.slug-doi').text());
                if (!JcbVideo.doi || JcbVideo.doi.length == 0) {
                    return;
                }
            }
        }
        var uri = 'http://rup-movie.glencoesoftware.com/metadata/';
        uri += JcbVideo.doi;
        uri += '?callback=?';
        $.getJSON(uri, function(data) {
              window.JcbVideoData = data;
              JcbVideo.setup();
              JcbVideo.setupWidget();
        });
    },

    videoLargerVersionInThisPage: function(event) {
        event.preventDefault();
        var div = $('#' + $(this).attr('video') + ' .fig-inline');
        div.addClass('inline-expansion');
    },

    setup: function(videos, options) {
        if (!videos || videos == "All") {
            videos = JcbVideo.getAllVideoParagraphs();
        }
        if (!window.JcbVideoInlined) {
            window.JcbVideoInlined = {};
        }

        var videosInlined = 0;
        videos.each(function(index) {
            var paragraph = $(this);
            var names = JcbVideo.getAllVideoNamesFromElement(paragraph);
            if (names == null) {
                return;
            }
            names = names.reverse();
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                if (window.JcbVideoInlined[name]) {
                    continue;
                }
                window.JcbVideoInlined[name] = true;
                // If we continue with this we'll need to handle callout links
                // like "Videos 1 and 2" or "Videos 1-3".
                var data = window.JcbVideoData[name];
                if (data == null) {
                    return;
                }
                if (paragraph.parents('div.fig-caption').length > 0) {
                    paragraph.parents('div.fig').after(
                        $(data['html']));
                } else { 
                    paragraph.after($(data['html']));
                }

                $('#' + data['video_id']
                  + ' ul.callout-links a:not(.in-nv-vis').click(
                   JcbVideo.videoLargerVersionInThisPage);
                VideoJS.setup($('#' + data['video_id'] + ' video.video-js')[0]);
                if (JcbVideo.suppMaterialData) {
                    paragraph.hide();
                }
                videosInlined++;
            }
        });

        var anchors = JcbVideo.getAllVideoAnchors();
        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            var names = JcbVideo.getAllVideoNamesFromElement(anchor);
            var data = window.JcbVideoData[names[0]];
            if (data == null) {
                continue;
            }
            $(anchor).attr('href', '#' + data['video_id']);
        }

        $('a.inline-video-expansion').click(JcbVideo.inlineVideoExpansion);

        if (videosInlined > 0) {
            $('.ds-embed-wrap').hide();
        }
    },

    setupWidget: function(videos, options) {
        if (!videos || videos == "All") {
            videos = JcbVideo.getAllVideoParagraphs();
        }
		// create new element to contain cloned figures and UL for navigation tabs
		var new_el = '<div class="cb-section expandable-block closed dynamic-vids" id="cb-art-videos">'
		+ '<h4 class="cb-section-header">Videos</h4>'
		+ '<ol style="display: none; margin: 0px;">'
		+ '<li id="sidebar-videos">'
		+ '<ul class="vid-nav"></ul>'
		+ '</li>'
		+ '</ol>'
		+ '</div>';

        if ($('#cb-art-figures').length != 0 && videos.length > 0) {
            var names = [];
            for (name in window.JcbVideoData) {
                names.push(name);
            }
            if (names.length == 0) {
                return;
            }
            $('#cb-art-figures').after(new_el);
            var pattern = /Video[^\d]*(\d+)/;
            names.sort(function(a, b) {
                num_a = a.match(pattern)[1];
                num_b = b.match(pattern)[1];
                return num_a - num_b;
            });
            for (i in names) {
                var name = names[i];
                var index = parseInt(i) + 1;
                var ul = $('#sidebar-videos ul.vid-nav');
                ul.append('<li id="v_' + index
                          + '">' + index + '</li>');
                ul.after('<div id="v' + index + '" class="vid pos-float odd v_' + index
                         + '" style="display: none;" '
                         + 'video="' + name + '"></div>');
            }
        }

        var target_area = $('#col-3.js-target');
        target_area.click(function(eventObject) {
            var target = $(eventObject.target);
            if (target.parents().hasClass('vid-nav')) {
                var tabId = target.attr('id');
                JcbVideo.widgetActivateVideo(tabId);
            } else if (target.is('#cb-art-videos h4.cb-section-header')) {
                if (!$('#cb-art-videos ul.vid-nav li').hasClass('active')) {
                    JcbVideo.widgetActivateVideo('v_1');
                }
            }
        });
    },

    widgetActivateVideo: function(tabId) {
        $('#col-3 ul.vid-nav li').removeClass('active')
        .filter(function() {
            return $(this).attr('id') == tabId;
        })
        .addClass('active');
        var toShow = $('#col-3 div.dynamic-vids div.vid').hide();
        toShow.empty();
        toShow = toShow.filter(function() {
            return $(this).hasClass(tabId);
        });
        toShow.append($(window.JcbVideoData[toShow.attr('video')]['html_widget']));
        var videos = $('#col-3 div.vid video.video-js').get();
        VideoJS.setup(videos);
        toShow.show();
    },

    paragraphFilter: function() {
        return /Video|Movie/.test($(this).text());
    },

    getAllVideoParagraphs: function() {
        var paragraphs = $("div#content-block p").filter(
                JcbVideo.paragraphFilter);
        if (paragraphs.length == 0) {
            paragraphs = $("div#content-block-widget p").filter(
                    JcbVideo.paragraphFilter);
        }
        return paragraphs;
    },

    getAllVideoAnchors: function(paragraph) {
        return $("div.article a:contains('Video')");
    },

    getVideoNamesDashed: function(baseMatch) {
        var matches = [];
        var keys = baseMatch.match(/(?:Video|Movie)s?\s+S?(\d+)[–-]S?(\d+)/);
        if (!keys || keys.length != 3) {
            return matches;
        }
        for (var i = keys[1]; i <= keys[2]; i++) {
            matches.push('Video ' + i);
        }
        return matches;
    },

    getVideoNamesCommasAndNormal: function(baseMatch) {
        var matches = [];
        var numbers = baseMatch.match(/(\d+),?/g);
        for (var i = 0; i < numbers.length; i++) {
            matches.push('Video ' + numbers[i]);
        }
        return matches;
    },

    getAllVideoNamesFromElement: function(element) {
        var pattern = /(?:Video|Movie)s?\s+((S?\d+[–-]+S?\d+)|(S?\d+,[\d,]+)|(S?\d+\s+and\s+S?\d+)|(S?\d+))/g;
        var baseMatches = $(element).text().match(pattern);
        if (!baseMatches) {
            return baseMatches;
        }
        var matches = [];
        for (var i = 0; i < baseMatches.length; i++) {
            var baseMatch = baseMatches[i];
            var dashMatches = JcbVideo.getVideoNamesDashed(baseMatch);
            if (dashMatches.length > 0) {
                matches = matches.concat(dashMatches);
            }
            matches = matches.concat(
                    JcbVideo.getVideoNamesCommasAndNormal(baseMatch));
        }
        return JcbVideo.unique(matches);
    },

    inlineVideoExpansion: function(event) {
        event.preventDefault();
        var a = $(this);
        var videoId = a.attr('video');
        var div = a.parents('div.fig-inline');
        var oldWidth = div.width();
        div.addClass('inline-video-expansion');
        var newWidth = div.width();
        var data = null;
        for (name in window.JcbVideoData) {
            data = window.JcbVideoData[name];
            if (data['video_id'] == videoId) {
                newWidth = Math.min(440, Math.max(newWidth, data['width']));
                break;
            }
        }
        div.width(newWidth);
        var ratio = newWidth / oldWidth;
        var video = div.find('video');
        newWidth = Math.min(data['width'], newWidth);
        var newHeight = video.height() * ratio;
        video.width(newWidth);
        video.height(newHeight);
        var flashObject = div.find('object');
        //flashObject.width(newWidth);
        //flashObject.height(newHeight);
        VideoJS.setup(video.get());
    },

    unique: function(array) {
        var o = {}, i, l = array.length, r = [];
        for(i = 0; i < l; i += 1) o[array[i]] = array[i];
        for(i in o) r.push(o[i]);
        return r;
    },
};

JcbVideo.setupAllWhenReady();

