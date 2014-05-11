var JWPlayerBuilder = function(jwPlayerParams) {
	//	Constructor for holding default SWFObject properties
	var dotSubRefId = document.location.pathname.replace(/[\-\/.]/g, '');
	this.setupObject = {
		flashplayer: 'http://pubs.acs.org/iapps/flash/player.5.7.swf',
		height: '336',
		logo: 'http://pubs.acs.org/iapps/flash/logomark.png',
		plugins: {
			'http://pubs.acs.org/iapps/dev/youtubealt/dotsub-local.swf': {
				'user': 'acsvideo1',
		 		'refid': dotSubRefId,
				'buttontype': 'currentLanguage',
				'controlbarhack': '36'
			},
			'gapro-2': {
				'accountid': 'UA-7663985-4'
			}
		},
		'playlist.position': 'none',
		skin: 'http://pubs.acs.org/iapps/flash/snel/snel.xml',
		stretching: 'uniform',
		width: '592'
	};

	this.playlistObject = {};
	for (var i = 0; i < jwPlayerParams.length; i++) {
		var paramNameArray = jwPlayerParams[i].name.strip().replace(/"/g, '').split('.');
		var list = paramNameArray[0];
		var index = paramNameArray[1];
		var name = paramNameArray[2];
		if (!this.playlistObject[list]) this.playlistObject[list] = []; 
		if (!this.playlistObject[list][index]) this.playlistObject[list][index] = {}; 
		this.playlistObject[list][index][name] = jwPlayerParams[i].value.strip().replace(/"/g, '');
	};
	
	if (this.playlistObject.master && 1 == this.playlistObject.master.length) {
		for (var p in this.playlistObject.master[0]) {
			if (this.playlistObject.master[0].hasOwnProperty(p)) {
				this.setupObject[p] = this.playlistObject.master[0][p];
			}
		}
	}
	
	//	Set up for YouTube availability test
	this.isYouTubeAccessible;
	this.youTubeTestImage = new Image();
	this.testImageTimeout = 0;
	
	//	Scope control
	thisJWBuilder = this;

	//	Comment out the first line and uncomment the second to simulate conditions where YouTube is not accessible
	this.youTubeTestImage.src = 'http://s.ytimg.com/yt/img/pixel.gif';	//	Uncomment for normal behavior
	//this.youTubeTestImage.src = 'http://s.ytimg.com/yt/img/gbrzlkjdao.gif';	//	Uncomment for testing without YouTube


	this.loadSWFs = function() {
		//	Give ytimg.com a full second to serve up the little 1px test image
		if (!this.youTubeTestImage.complete && this.testImageTimeout <= 1000) {
			setTimeout(function() {thisJWBuilder.loadSWFs();}, 100);
			this.testImageTimeout += 100;
			return false;
		}
		
		//	Test YouTube availability
		this.isYouTubeAccessible = (!!this.youTubeTestImage.width) ? true : false;

	
		//	Copy properties to conditional player based on YouTube availability
		if (this.isYouTubeAccessible) {
			this.setupObject.provider = 'youtube';
			this.setupObject.playlist = this.playlistObject.youtube;
		} else {
			this.setupObject.modes = [
				{
					type: 'flash',
					src: 'http://pubs.acs.org/iapps/flash/player.5.7.swf',
					config: {
						provider: 'rtmp',
						//	streamer: 'rtmp://flash81il.audiovideoweb.com/str/',
						playlist: this.playlistObject.wowza
					}
				},
				{
					type: 'html5', 
					config: {
						provider: 'http',
						playlist: this.playlistObject.html
					}
				}				
			];
		}
	
		//	Emebed the conditional player
		jwplayer('jwPlayerContainer').setup(this.setupObject);
	}
}