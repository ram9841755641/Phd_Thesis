var OAS_listpos = 'x21';

$(document).ready(function() {
        if (callbackToken) {
            $('span.cit-vol').prepend('<br>');

            // display abstract view
            displayAbs();            
        }
});

function displayAbs() {
        var absCits = null;
        var matchExpr;

        matchExpr = ".cit div.cit-extra a";
        absCits = $(matchExpr);

        if (absCits.length) {
            absCits.each(function() {
                var $this = $(this);
                var absLink = null;

                if ($this.attr("rel") == 'abstract') {
                   absLink = $this.attr('href');
                   var ajaxUrl = document.location.protocol + "//" + document.location.host + absLink;

                    $.ajax({
                    url: ajaxUrl,
                    dataType: "html",
                    type: "GET",
                    beforeSend: addAbsDirHeaders,
                    error: ajaxErr,
                    success: addAbsTologin,
                    complete: ajaxComplete
                    });
                }
            }   
        )}
 }

function addAbsDirHeaders(req) {
        addCommonHeaders(req);
        addPartHeaders(req);
}
function ajaxErr(req, msg, e) {
}
function ajaxComplete(req, msg) {
}
function addAbsTologin(xhtmlData) {
        // if we get back a whole html page instead of a fragment, don't display
        if (xhtmlData && !(xhtmlData.indexOf('<html') >= 0)) {    
            if ($(xhtmlData).find('div.abstract').length) {
                var abs = $(xhtmlData).find('div.abstract').html();
                if (abs.indexOf('<h2>Abstract</h2>') != -1) {
                    abs = abs.substring(17, abs.length);
                }
                
                var words = abs.split(' ');
                var i = 0;
                var abs50words = '';
                if (words.length > 50) {
                    while(i <= 50) {
                        abs50words +=  words[i] + ' ';
                        i++;
                    }
                    
                    $('div#abs-short').append('<p class="abs-on-login">' + abs50words + ' <a href="#" id="abs-more"><b>More</b></a></p>');
                    $('div#abs-long').append(abs).css('display','none');
                    
                    $('div#abs-short a').each(function(i) {
                        var absShort = $(this);
                        absShort.click(function(a) {
                            $('div#abs-long').css('display','inline');
                            $('div#abs-short').css('display','none');
                            
                            if (absShort.attr("href") != undefined) {
                                a.preventDefault();
                            }
                        });
                    });
                } else {
                    $('div#abs-short').append(abs);
                }
            }        
        }
}
