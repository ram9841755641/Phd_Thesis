function findPosY(obj) {
    var curtop = 0;
    if(obj.offsetParent) {
        while(1) {
            curtop += obj.offsetTop;
            if(!obj.offsetParent) { break; }
            obj = obj.offsetParent;
        }
    }
    else if(obj.y) {
        curtop += obj.y;
    }
    return curtop;
}

function getWindowHeight() {
    var windowHeight=0;
    if(typeof(window.innerHeight) == 'number') {
        windowHeight = window.innerHeight;
    }
    else {
        if(document.documentElement && document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight;
        }
        else {
            if(document.body && document.body.clientHeight) {
                windowHeight = document.body.clientHeight;
            }
        }
    }
    return windowHeight;
}

var OPAC = 0;
var InfoBubble = {

    bubbleTimeout: 1,
    currentBubble: null,
    timeoutBubbleID: null,
    currentLink: null,

    show: function(aID, bID) {
        var disableFade = 0;
        if(this.currentBubble) {
            disableFade = 1;
        }
        var aBubble = document.getElementById(aID);
        if(aBubble && aBubble != this.currentBubble) {
            this.hide();
            var aBubbleLink = document.getElementById(bID);
            aBubbleLink.style.background = '#EFEFEF';
            this.currentLink = aBubbleLink;
            if(disableFade == 0) {
                aBubble.style.filter = 'alpha(opacity=0)';
                aBubble.style.opacity = 0;
            }
            else {
                aBubble.style.filter = '';
                aBubble.style.opacity = '';
            }
            aBubble.style.display = 'inline';
            var heightFromTop = findPosY(aBubble) - document.body.scrollTop;
            if(getWindowHeight() < (aBubble.offsetHeight + heightFromTop)) {
                //aBubble.style.top = (getWindowHeight() - (aBubble.offsetHeight + heightFromTop)) - 5;
            }
            else {
                if(heightFromTop < 0) {
                    aBubble.style.top = (Math.abs(heightFromTop)) + 5;
                }
                else {
                    aBubble.style.top = 5;
                }
            }
            this.currentBubble = aBubble;
            if(disableFade == 0) {
                setTimeout('InfoBubble.fadeIn()',300);
                OPAC = 0;
            }
        }

        if(this.timeoutBubbleID) {
            clearTimeout(this.timeoutBubbleID);
        }
    },

    hide: function() {
        if(this.currentBubble) {
            this.currentLink.style.background = '#FFFFFF';
            this.currentBubble.style.display = 'none';
            this.currentBubble.style.top = 0;
            this.currentBubble = null;
            if(this.timeoutBubbleID) {
                clearTimeout(this.timeoutBubbleID);
            } 
        }
    },

    timeout: function() {
        if(OPAC == 0) {
            InfoBubble.hide();
        }
        else {
            this.timeoutBubbleID = setTimeout('InfoBubble.hide()', this.bubbleTimeout * 1000);
        }
    },

    fadeIn: function() {
        if(this.currentBubble) {
            OPAC = OPAC + .10;
            OPAC = (OPAC>1)?1:OPAC;
            this.currentBubble.style.filter = 'alpha(opacity='+parseInt(100*OPAC)+')';
            this.currentBubble.style.opacity = OPAC;
            if(OPAC<1) {
                setTimeout('InfoBubble.fadeIn()',25);
            }
        }
    }
}
