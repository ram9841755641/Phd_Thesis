(function() {

    var AchsTrack = function($, undefined) {

        var jCode = $('#content-wrap[class^=jcode-]');
        if (jCode.length == 0) {
            return;
        }
        jCode = jCode[0].className.match(/jcode-(\S+)/)[1];
        if (jCode === undefined) {
            return;
        }

        var addJournalCode = function(options) {
            return {journalCode: jCode}
        };

        Track('setup', {
            options: {
                addData: addJournalCode
            },
            ajaxSettings: {
                url: '/action/clickThrough'
            }
        });

        Track({
            'a#orderReprints' : { data: {
                id: "983488"
            }},
            'a#rightsAndPermissions' : { data: {
                id: "983496"
            }},
            'a#recommendCiteULike' : { data: {
                id: "983512"
            }},
            'a#recommendDelicious' : { data: {
                id: "983520"
            }},
            'a#recommendDiggThis' : { data: {
                id: "983528"
            }},
            'a#recommendFacebook' : { data: {
                id: "983536"
            }},
            'a#recommendNewsvine' : { data: {
                id: "983544"
            }},
            'a#recommendTwitter' : { data: {
                id: "983552"
            }},
            '#relatedArticles li a' : { data: {
                id: "983560"
            }}
        });
    };

    if (typeof jQuery != 'undefined') {
        jQuery(document).ready(function() {
            AchsTrack(jQuery);
        });
    } else if (typeof window.Prototype != 'undefined') {
        document.observe('dom:loaded', function() {
            AchsTrack($$);
        });
    }
})();