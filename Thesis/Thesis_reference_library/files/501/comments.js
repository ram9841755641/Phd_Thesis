
// RealTidbits Stuff
if (typeof window.RealTidbits !== 'object') window.RealTidbits = {};
if (typeof window.RealTidbits.settings !== 'object') window.RealTidbits.settings = {};
if (typeof window.RealTidbits.Comments !== 'object') window.RealTidbits.Comments = {};
if (typeof window.RealTidbits.applications !== 'object') window.RealTidbits.applications = {};

// get paths
function getRTBScriptPath() {
    var scripts = document.getElementsByTagName('SCRIPT');
    var path = '';
    if(scripts && scripts.length>0) {
        for(var i in scripts) {
            if(scripts[i].src && scripts[i].src.match(/realtidbits.com\/.+?comments\.js/)) {
                path = scripts[i].src.toString();
				//path = scripts[i].src.replace(/(.*)comments\.js$/, '$1');
            }
            if(scripts[i].src && scripts[i].src.match(/c299782.+?comments\.js/)) {
                path = scripts[i].src.toString();
				//path = scripts[i].src.replace(/(.*)comments\.js$/, '$1');
            }
        }
    }
	var path = path.split('/').slice(0, -2).join('/');
    return path;
}

// determine the script path for application
if(typeof _rtbScriptPath == "undefined") {
	var _rtbScriptPath = getRTBScriptPath();
	// check for ssl protocol
	if(_rtbScriptPath.indexOf("https:") == 0) {
		// override rtb ssl redirect and use full paths
		var dir = _rtbScriptPath.split('/').pop();
		_rtbScriptPath = "https://c299782.ssl.cf1.rackcdn.com/libs/" + dir;
	};
};
// document.location.protocol == "https:"
var _rtbScriptProtocol = "http://";
if(_rtbScriptPath.indexOf("https:") == 0) {
	_rtbScriptProtocol = "https://"
};

var dependenciesEcho = [
	['echo-backplane', '//cdn.echoenabled.com/clientapps/v2/backplane.js'],
	['echo-submit', '//cdn.echoenabled.com/clientapps/v2/submit.js'],
	['echo-stream', '//cdn.echoenabled.com/clientapps/v2/stream.js'],
	['echo-user-list', '//cdn.echoenabled.com/clientapps/v2/user-list.js'],
	['echo-counter', '//cdn.echoenabled.com/clientapps/v2/counter.js'],
	['echo-submitcounter', '//cdn.echoenabled.com/clientapps/v2/plugins/submit-text-counter.js'],
	['echo-auth', '//cdn.echoenabled.com/clientapps/v2/auth.js'],
	['echo-form-auth', '//cdn.echoenabled.com/clientapps/v2/plugins/form-auth.js'],
	['echo-reply', '//cdn.echoenabled.com/clientapps/v2/plugins/reply.js'],
	['echo-curation', '//cdn.echoenabled.com/clientapps/v2/plugins/curation.js'],
	['echo-like', '//cdn.echoenabled.com/clientapps/v2/plugins/like.js'],
	['echo-user-privileges', '//cdn.echoenabled.com/clientapps/v2/plugins/user-privileges.js'],
	['echo-user-ban', '//cdn.echoenabled.com/clientapps/v2/plugins/user-ban.js'],
	['echo-twitter', '//cdn.echoenabled.com/clientapps/v2/plugins/twitter-intents.js'],
	['echo-community-flag', _rtbScriptPath+'/community-flag-hotfix.js']
];
var dependenciesRTB = [
	['rtb-analytics', _rtbScriptPath + '/analytics/analytics.js'],
	['rtb-FileUpload', _rtbScriptPath + '/FileUpload/FileUpload.js'],
	['rtb-tokbox', _rtbScriptPath + '/tokbox/tokbox.js'],
	['rtb-RichTextEditor', _rtbScriptPath + '/RichTextEditor/RichTextEditor.js'],
	['rtb-UpdateSort', _rtbScriptPath + '/UpdateSort/UpdateSort.js'],
	['rtb-LMKSubscription', _rtbScriptPath + '/EMBSubscription/EMBSubscription.js'],
	['rtb-rssfeed', _rtbScriptPath + '/rssfeed/rssfeed.js'],
	['rtb-janrain-sharing', _rtbScriptPath + '/janrain-sharing.js'],
	['rtb-inlinemedia', _rtbScriptPath + '/inlinemedia.js'],
	['rtb-sanitize', _rtbScriptPath + '/sanitize.js'],
	['rtb-notifications', _rtbScriptPath + '/notifications/notifications.js'],
	['rtb-comments-edit', _rtbScriptPath + '/comments/edit.js'],
	['rtb-comments-locale-en', _rtbScriptPath + '/comments/locale/en.js'],
	['rtb-comments-core', _rtbScriptPath + '/comments/comments_core.js']
];

document.writeln('<script type="text/javascript" src="' + _rtbScriptPath + '/jquery-pack.js"></script>');

// attach the required javascripts
for(var i=0;i<dependenciesEcho.length;i++) {
	document.writeln('<script type="text/javascript" src="' + dependenciesEcho[i][1] + '"></script>');
};

// attach the required javascripts
for(var i=0;i<dependenciesRTB.length;i++) {
	document.writeln('<script type="text/javascript" src="' + dependenciesRTB[i][1] + '"></script>');
};

//
if(RealTidbits.settings.ads == true) {
	document.writeln(unescape('%3Cscript%3E'+
	'google_ad_client = "ca-pub-6500071870655865";'+
	'google_ad_slot = "0167440026";'+
	'google_ad_width = 468;'+
	'google_ad_height = 60;'+
	'%3C\/script%3E'+
	'%3Cscript src="http:\/\/pagead2.googlesyndication.com\/pagead\/show_ads.js"%3E%3C\/script%3E'));
};