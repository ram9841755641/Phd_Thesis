// All rights reserved CheckM8 Inc. (c) 2009
(function(){

	function CM8EncodeProfile(profile)
{
	var attrs = (profile || "").split("&");
	for (var i = 0; i < attrs.length; i++) {
		var index = attrs[i].indexOf("=");
		if (index == -1)
			index = attrs[i].length;
		var attr = attrs[i].substr(0, index);
		var value = attrs[i].substr(index + 1);
		if (attr) {
			attr = ((attr.toLowerCase().indexOf("encoded:") == 0) ? attr.substring(8) : encodeURIComponent(attr));
		}
		if (value) {
			value = ((value.toLowerCase().indexOf("encoded:") == 0) ? value.substring(8) : encodeURIComponent(value)).replace(/%2C/g, ",");
		}
		attrs[i] = attr + ((index < attrs[i].length) ? "=" : "") + value;
	}
	return ((attrs.length>0)?"&":"")+attrs.join("&");
}


	function richMediaX()
	{
		if ((typeof(CM8RichMedia) != "undefined") &&
			((CM8RichMedia.toString().toLowerCase() == "no") ||
			 (CM8RichMedia.toString().toLowerCase() == "false")))
			return "";
		else
			return "r";
	}
	
	function preparePhFormat(PHE)
	{
		var PHF = PHE.title;
		if (PHF) {
			PHE.title = "";
			PHF = decodeURIComponent(((PHF.toLowerCase().indexOf("encoded:") == 0) ? PHF.substring(8) : encodeURIComponent(PHF)));
			PHE.CM8RawFormat = PHF;
			PHE.CM8Format = PHF.replace(/:.*/, "");
		}
		if (! PHE.CM8Format) {
			PHE.CM8Format = "";
			PHE.CM8RawFormat = "";
		}
	}
	
	function initEcosphere()
	{
		

if (typeof(window.CM8Page) == "undefined") {
	if (document.location && (document.location.search.indexOf('CM8Page=') != -1))
		window.CM8Page=document.location.search.replace(/.*CM8Page=/, "").replace(/&.*/, "");
	else
			window.CM8Page=String(Math.random()).slice(2);
}



var CM8XCat = decodeURIComponent(((CM8Cat.toLowerCase().indexOf("encoded:") == 0) ? CM8Cat.substring(8) : encodeURIComponent(CM8Cat))); 

window.CM8E = window.CM8E || {};
CM8E[CM8XCat] = CM8E[CM8XCat] || {};
var CM8ET = {
	cat: CM8XCat,
	page: CM8Page,
	server: CM8Server,
	lastRequestSerial: 999,
	pageViewStartSerial: 1,
	serialsData: {},
	spotlesses: {},
	placeHolders: [],
	lastPVCriterias: "",
	lastPVPHs: {},
	counts: {},


	clearRemovedPlaceHolders: function(elementToBeRemoved)
	{
		for (var cat in CM8E) {
			var otherCM8CE = CM8E[cat];
	
			for (var i = (otherCM8CE.placeHolders || []).length - 1; i >= 0; i--) {
				var ph = otherCM8CE.placeHolders[i];
				if (typeof(ph.element) != "string") {
					var elementInDom = function(scan)
						{
							if (! scan)
								return true;
							for (; scan && (scan != document.body); scan = scan.parentNode)
								if (scan == elementToBeRemoved) {
									scan = null;
									break;
								}
							return scan;
						};
					var placeHolderExists = elementInDom(ph.element) && elementInDom(ph.showingElement);
					
				}
				else {
					try {
						var placeHolderExists = eval(ph.element);
						
					}
					catch(e) {
						var placeHolderExists = false;
						
					}
				}
				if (! placeHolderExists) {
					if (ph.cleanup)
						ph.cleanup();
					otherCM8CE.placeHolders.splice(i, 1);
				}
			}
		}
	},
	
	
	initRequest: function(newPV)
	{
		this.lastRequestSerial++;
		
		if (newPV)
			this.pageViewStartSerial = this.lastRequestSerial;
		var now = new Date().getTime();
		this.serialsData[this.lastRequestSerial] = {cat: this.cat, serial: this.lastRequestSerial, sendTime: now, newPV: newPV, ads: {} };

		for (var i = 0; i < this.placeHolders.length; i++) {
			var ph = this.placeHolders[i];
			if (ph.lock_time && ((now - ph.lock_time) >20000)) {
				
				ph.lock_time = null;
			}
		}

		for (var otherCat in CM8E)
			if (CM8E[otherCat].clearRemovedPlaceHolders)
				CM8E[otherCat].clearRemovedPlaceHolders();
		
		return this.lastRequestSerial;
	},
	
	
	preparePH: function(serial, element, own, companion, format)
	{
		// TODO: REMOVE THIS!!!  Need to be done on the plugin !!!
		if (typeof(element) == "string")
			element = element.replace(/(\(function\(\){ var pluginData = \(window.CM8MainWindow \|\| window\).CM8E\[)([^\]]*)(\].pluginsData\[[0-9]*\]; return pluginData.pluginWindow.CM8PluginProxy\(plugin)s(Data.pluginObject,.*)/, "$1'$2'$3$4");
	
	
	
		if (typeof(element) != "string") {
			for (var parent = element; parent && (parent != document.body); parent = parent.parentNode) {
				for (var i = 0; i < this.placeHolders.length; i++) {
					var ph = this.placeHolders[i];
					if (ph.lock_time && (ph.element == parent) && ph.own) {
						
						return false; 
					}
				}
			}
			if (! parent) { 
				
				return false;
			}
			var kickedOut = [];
			if (own) {
				for (var i = 0; i < this.placeHolders.length; i++) {
					var ph = this.placeHolders[i];
					if (typeof(ph.element) != "string") {
						for (var parent = ph.element; parent && (parent != document.body); parent = parent.parentNode) {
							if (element == parent) {
								if (ph.lock_time) {
									
									return false;
								}
								if (! companion) {
									kickedOut.push(i);
									
									if (ph.cleanup)
										ph.cleanup();
									break;
								}
							}
						}
					}
				}
			}
			
			for (var i = kickedOut.length - 1; i >= 0; i--)
				this.placeHolders.splice(kickedOut[i], 1);
		}
		else {
			for (var i = 0; i < this.placeHolders.length; i++) {
				var ph = this.placeHolders[i];
				if (ph.lock_time && (ph.element == element)) {
					
					return false; 
				}
			}
		}
		
		this.placeHolders.push({
				element: element,
				showingElement: null,
				own: own,
				companion: companion,
				format: format,
				adId: null,
				serial: serial });
		
		return true;
	},
	
	
	buildRequest: function(serial, path, extraParams)
	{
		var ignoredFormats = {};
		if (window.CM8IgnoredFormats && CM8IgnoredFormats.length)
			for (var i = 0; i < CM8IgnoredFormats.length; i++)
				ignoredFormats[CM8IgnoredFormats[i]] = true;
	
		var serialData = this.serialsData[serial];
		var recentSerials = [];
		for (var serialScan in this.serialsData) {
			var serialScanData = this.serialsData[serialScan];
			var time = serialScanData.sendTime;
			if (serialScanData.receiveTime && time && (serialData.sendTime - time) <= 25000)
				recentSerials.push(serialScan);
		}
		
		var history = [];
		for (var adId in this.spotlesses)
			history.push(adId);
		for (var i = 0; i < this.placeHolders.length; i++) {
			var ph = this.placeHolders[i];
			if (ph.adId && (! ignoredFormats[ph.format]))
				history.push(ph.adId);
		}
		
		if (serialData.newPV) {
			this.lastPVCriterias = "";
			this.lastPVPHs = {};
			this.counts = {};
		}
		
		var xPH = "";
		for (var format in this.lastPVPHs)
			if (! ignoredFormats[format])
				xPH += format + "," + this.lastPVPHs[format] + ",";
		
		var dynamicDetections = (function()
{
	var nav = window.navigator || {};

	function get_time()
	{
	   	var theDate = new Date();
		var YYYY = new String(theDate.getYear());
		for(i=4-YYYY.length;i>0;i--)
			YYYY = "0" + YYYY;
		var MM = new String(theDate.getMonth()+1);
		if (MM < 1 || MM > 12)
			MM = 1;
		if (MM.length < 2)
			MM = "0" + MM;
		var DD = new String(theDate.getDate());
		if (DD < 1 || DD > 31)
			DD = 1;
		if (DD.length < 2)
			DD = "0" + DD;
		var HH = new String(theDate.getHours());
		if (HH < 0 || HH > 24)
			HH = 1;
		if (HH.length < 2)
			HH = "0" + HH;
	    return "&DATE=" + YYYY + MM + DD + "&HOUR=" + HH;
	}
	
	function get_size()
	{
		var width; var height;
		if (self.innerWidth) {
			width = self.innerWidth;
			height = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
			height = document.documentElement.clientHeight;
		}
		else if (document.body.clientWidth) {
			width = document.body.clientWidth;
			height = document.body.clientHeight
		}
		else {
			var width  = 1024;
			var height = 768;
		}
		
		var width_group;
		if (width > 1200)
			width_group = "WR_E";
		else if (width > 1000)
			width_group = "WR_D";
		else if (width > 800)
			width_group = "WR_C";
		else if (width > 600)
			width_group = "WR_B";
		else
			width_group = "WR_A";
	
		return "&WIDTH=" + width + "&HEIGHT=" + height + "&WIDTH_RANGE=" + width_group;
	}

	function resolution()
		{
			var s = window.screen || {};
			r = {
				w800h600:	"RS1",
				w1024h768:	"RS2",
				w1280h1024:	"RS3",
				w1600h1200:	"RS4",
				w1920h1440:	"RS5",
				w640h480:	"RS6",
				w720h480:	"RS7",
				w720h576:	"RS8",
				w848h480:	"RS9",
				w1152h864:	"RS10",
				w1280h720:	"RS11",
				w1280h768:	"RS12",
				w1280h960:	"RS13",
				w1280h800:	"RS14",
				w1280h854:	"RS15",
				w1280h900:	"RS16",
				w1400h1050:	"RS17",
				w1440h900:	"RS18",
				w1680h1050:	"RS19",
				w1920h1080:	"RS20",
				w1920h1200:	"RS21",
				w2048h1536:	"RS22",
				w2560h1600:	"RS23",
				w3200h2400:	"RS24",
				w3840h2400:	"RS25",
				w768h1024:	"RS26",
				w1360h768:	"RS27",
				w1366h768:	"RS27",
				w1600h900:	"RS28"
				}["w" + window.screen.width + "h" + window.screen.height];
			return "&RES=" + (r ? r : "OTHER") + "&RESW=" + window.screen.width + "&RESH=" + window.screen.height;
		}
		var common = resolution();	

	window.CM8GetLocation = function()
	{
		var encoded = [];
		var loc = document.location.href;
		for (var i = 0; i < loc.length; i++) {
			var code = loc.charCodeAt(i);
			if ((code >= 256) || (code == 32))
				encoded.push(encodeURIComponent(loc.substr(i, 1)));
			else if (code == 92)  // \
				encoded.push("\\\\");
			else if (code == 63)  // ?
				encoded.push("\\q");
			else if (code == 38)  // &
				encoded.push("\\a");
			else if (code == 37)  // %
				encoded.push("\\p");
			else if (code == 35)  // #
				encoded.push("\\s");
			else if (code == 34)  // "
				encoded.push("\\w");
			else if (code == 39)  // '
				encoded.push("\\u");
			else
				encoded.push(loc.substr(i, 1));
		}
		return encoded.join("");
	};
	
	return (
		"&LOC=" + CM8GetLocation().substr(0,1000) +
		get_size() + 
		get_time() +
		common +
		"&ORD=" + String(Math.random()).slice(2));
})()
;
		
		serialData.url =
				((document.location.protocol=="https:")?"https:":"http:") +
				"//" + this.server + path + "?" +
				"cat=" + encodeURIComponent(serialData.cat).replace(/%2C/gi, ",") +
				(this.page ? "&page=" + this.page : "") +
				"&serial=" + serial + ":" + this.pageViewStartSerial + ":" +
					String.fromCharCode(65 + (this.counts.total ? 1 : 0) + (this.counts.rm ? 2 : 0) + (this.counts.ph ? 4 : 0)) +
				(recentSerials.length ? "&recent_serials=" + recentSerials.join(",") : "") +
				(history.length ? "&history=" + history.join(",") : "") +
				(xPH ? "&x_place_holders=" + xPH : "") +
				(this.lastPVCriterias ? "&criterias=" + this.lastPVCriterias : "") +
				(serialData.newPV ? "&same_pv=false" : "") +
				"&" + dynamicDetections + "&" +
				extraParams;
		
		return serialData.url;
	},
	

	requestReceived: function(serial, spotlesses, criterias, placeHolders, counts)
	{
		if (! this.serialsData[serial]) {
			
			return;
		}
			
		this.serialsData[serial].receiveTime = new Date().getTime();
		
	
		for (var spotlessIndex = 0; spotlessIndex < spotlesses.length; spotlessIndex++) {
			var spotless = spotlesses[spotlessIndex];
			var spotlessData = this.spotlesses[spotless];
			
			if (spotlessData && spotlessData.cleanup)
				spotlessData.cleanup();
			this.spotlesses[spotless] = {};
		}
	
		if (serial >= this.pageViewStartSerial) {
			this.lastPVCriterias += criterias;
			
			this.lastPVPHs = this.lastPVPHs || {};
			var phsList = placeHolders ? placeHolders.split(',') : [];
			for (var i = 0; i < phsList.length; i+=2) {
				var format = phsList[i];
				if (format)
					this.lastPVPHs[format] = (this.lastPVPHs[format] || 0) + parseInt(phsList[i+1]);
			}
			
			counts = counts.charCodeAt(0) - 65;
			this.counts.total = this.counts.total || ((counts & 1) != 0);
			this.counts.rm    = this.counts.rm    || ((counts & 2) != 0);
			this.counts.ph    = this.counts.ph    || ((counts & 4) != 0);
		}
	
		for (var i = 0; i < this.placeHolders.length; i++) {
			var ph = this.placeHolders[i];
			if (ph.serial == serial)
				ph.lock_time = null;
		}			
	},
	
	
	bannerShowing: function(serial, showingElement, format, adId, ph)
	{
		// TODO: REMOVE THIS!!!  Need to be done on the plugin !!!
		if (typeof(showingElement) == "string")
			showingElement = showingElement.replace(/(\(function\(\){ var pluginData = \(window.CM8MainWindow \|\| window\).CM8E\[)([^\]]*)(\].pluginsData\[[0-9]*\]; return pluginData.pluginWindow.CM8PluginProxy\(plugin)s(Data.pluginObject,.*)/, "$1'$2'$3$4");
	
	
	
		if (typeof(showingElement) != "string") {
			for (var parent = showingElement; parent != document.body; parent = parent.parentNode)
				if (! parent) {
					
					return false;
				}
		}
		else {
			try {
				var x = eval(showingElement);
				if (! x) {
					
					return false;
				}
			}
			catch(e) {
				
				return false;
			}
		}
			
		if (! ph) {
			var phs = [];
			for (var i = 0; i < this.placeHolders.length; i++) {
				ph = this.placeHolders[i];
				if (ph.serial == serial)
					phs.push(ph);
			}
			
			if (phs.length == 1) {
				ph = phs[0];
				
			}
			else if (typeof(showingElement) != "string") {

				for (var i = 0; i < phs.length; i++) {
					ph = phs[i];
					var phElement = ph.element;
					if (phElement && (phElement.tagName == 'SCRIPT') && phElement.nextSibling) {
						if (phElement.nextSibling.id && (phElement.nextSibling.id.indexOf("CM8_FORMAT_") == 0))
							phElement = phElement.nextSibling;
						if (phElement.nextSibling == showingElement) {
							
							break;
						}
					}
					ph = null;
				}

				if (! ph) {
					var bestDistance;
					for (var i = 0; i < phs.length; i++) {
						var candidatePh = phs[i];
						var phElement = candidatePh.element && ((candidatePh.element.tagName == 'SCRIPT') ? candidatePh.element.parentNode : candidatePh.element);
						for (var scan = showingElement, distance = 0;
						     scan && (scan != document.body) && (scan != phElement) && ((! ph) || (distance < bestDistance));
						     scan = scan.parentNode, distance++);
						if (scan == phElement) {
							
							ph = candidatePh;
							bestDistance = distance;
						}
					}
				}
			}
			else {
				ph = null;
				for (var i = 0; i < phs.length; i++) {
					ph = phs[i];
					if (ph.element == showingElement) {
						
						break;
					}
					ph = null;
				}
			}
		}
		
		if (ph) {
			ph.showingElement = showingElement;
			ph.format = format;
			ph.adId = adId;
			ph.own = true;
			ph.used = true;
			
			return true;
		}
		
		
		return false;
	},
	
	
	removeAd: function(adId)
	{
		var adData = this.spotlesses[adId];
		if (adData) {
			
			if (adData.cleanup)
				adData.cleanup();
			delete this.spotlesses[adId];
			return;
		}
		
		for (var i = 0; i < (this.placeHolders || []).length; i++) {
			var ph = this.placeHolders[i];
			if (ph.adId == adId) {
				
				if (ph.cleanup)
					ph.cleanup();
				while (ph.element.lastChild)
					ph.element.removeChild(ph.element.lastChild);
				this.placeHolders.splice(i, 1);
				return;
			}
		}		

		
	}
};
for (var CM8ETP in CM8ET)
	if ((typeof(CM8ET[CM8ETP]) == 'function') || (! CM8E[CM8XCat][CM8ETP]))
		CM8E[CM8XCat][CM8ETP] = CM8ET[CM8ETP];

		if (! window.CM8AjaxGlobalDiv) {
			window.CM8AjaxGlobalDiv = document.createElement("SPAN");
			document.body.insertBefore(window.CM8AjaxGlobalDiv, document.body.firstChild);
		}
		
		var CM8CE =CM8E[CM8XCat];

		CM8CE.generateDivsParams = function(FNL, serial, isCompanions)
		{
			var extra="";
			var xformats = {};
			if (FNL.substr(0, 1) == "!") {
				var xformat = FNL.substr(1);
				var xformat_array = ((xformat.toLowerCase().indexOf("encoded:") == 0) ? xformat.substring(8) : encodeURIComponent(xformat)).split("%2C");
				extra = "&xformat=";
				FNL = "*";
				for (var i = 0; i < xformat_array.length; i++) {
					var xformat = xformat_array[i];
					xformats[decodeURIComponent(xformat)] = true;
					if (xformat.indexOf("%3A") == -1)
						extra += xformat + ",";
				}
			}
		
			var FNA = FNL.split(",");
			var FNS = {};
			for (var FNI = 0; FNI < FNA.length; FNI++) {
				var FMT =((FNA[FNI].toLowerCase().indexOf("encoded:") == 0) ? FNA[FNI].substring(8) : encodeURIComponent(FNA[FNI]));
				FNS[decodeURIComponent(FMT)] = true;
			}
		
			var FD = {};
			var PHA = document.getElementsByTagName("DIV");
			for (var PHI = 0; PHI < PHA.length; PHI++) {
				var PHE = PHA[PHI];
				if (PHE.id.indexOf("CM8ShowAd") == 0) {
					preparePhFormat(PHE);
					if (PHE.CM8Format) {
						if (document.getElementById('CM8_FORMAT_' + PHE.CM8Format) == null) {

var addDiv = true; 
for (var nrg = PHE; nrg && (nrg != document.body); nrg = nrg.parentNode)
	if ((nrg.id == "moreColumn") && (nrg.parentNode.id == "main"))
		addDiv = false;
if (addDiv) {
							var PHX = document.createElement('DIV');
							PHX.id = 'CM8_FORMAT_' + PHE.CM8Format;
							PHX.style.display = 'none';
							PHE.appendChild(PHX);
}
						}
						
						if (((! FNL) || (FNL == '*') || FNS[PHE.CM8Format] || FNS[PHE.CM8RawFormat]) &&
						    (! xformats[PHE.CM8Format]) && (! xformats[PHE.CM8RawFormat])) {
							if (CM8CE.preparePH(serial, PHE, true, isCompanions, PHE.CM8Format)) {	
								if (FD[PHE.CM8Format])
									FD[PHE.CM8Format]++;
								else
									FD[PHE.CM8Format] = 1;
							}
						}
					}
				}
			}
		
			var FDS = "";
			for (var FDI in FD)
				FDS += "," + encodeURIComponent(FDI) + "," + FD[FDI];
			FDS = FDS.substr(1) || ",";
		
			return "&place_holders=" + FDS + extra;
		}

		CM8CE.CM8AjaxApply = function(serial)
		{
			var CM8CES = CM8CE.serialsData[serial];
	
			var CBA = [];
			for (var PHI = 0; PHI < CM8CE.placeHolders.length; PHI++) {
				var PHD = CM8CE.placeHolders[PHI];
				if (PHD.serial == serial)
					for (var E = PHD.element; E; E = E.parentNode)
						if (E == document.documentElement) {

							if (PHD.cleanup) {
								PHD.cleanup();
								delete PHD.cleanup;
							}

							for (var child = PHD.element.lastChild; child; child = prevChild) {
								var prevChild = child.previousSibling;
								if ((child.tagName != "DIV") || (child.id != ("CM8_FORMAT_" + PHD.format))) {
									for (var otherCat in CM8E)
										CM8E[otherCat].clearRemovedPlaceHolders(child);
									if (child.parentNode == PHD.element)  // May have been removed from DOM by clearRemovedPlaceHolders()
										PHD.element.removeChild(child);
								}
							}
					
							var AID = null;
							for (var TTI = 0; TTI < CM8CES.CM8Titles.length; TTI++) {
								var TFD = CM8CES.CM8Titles[TTI];
								if (TFD[0] == PHD.format) {
									TFD[3]++;
									var FAA = TFD[4];
									for (var ADI = 0; ADI < FAA.length; ADI++) {
										var ADD = FAA[ADI];
										if (! ADD.used) {
											AID = ADD[1];
											ADD.used = true;
											PHD.adId = AID;
											CM8CE.showAjax(CM8CES, AID, PHD.element, ADD[0]);
											break;
										}
									}
								}
							}
					
							CBA.push({element:PHD.element, format:PHD.format, ad_id:AID});
						}
			}
		
			if (CM8CES.CBK && CM8CES.CBK.call && CM8CES.CBK.apply)
				CM8CES.CBK(CM8CES.UD, serial, CBA);
		};
		
		CM8CE.CM8Transplant = function(tag,code)
{
	var x = Math.random();
	window.CM8TplntSync = window.CM8TplntSync || {};
	window.CM8TplntAsync = window.CM8TplntAsync || {};
	code = "<SCR"+"IPT TYPE='text/javascript'>window.CM8TplntSync['" + x + "']=true</SCR"+"IPT>" +
			"<SCR"+"IPT DEFER TYPE='text/javascript'>window.CM8TplntAsync['" + x + "']=true</SCR"+"IPT>" + code;

	var w = document.createElement("SPAN");
	tag.appendChild(w);

	var rangeWorks;
	if ((typeof(document.createRange)!='undefined') && (typeof(w.node)!='undefined')) {
		var r = document.createRange();
		if (r.setStartAfter && r.createContextualFragment) {
			r.setStartAfter(w);
			w.insertBefore(r.createContextualFragment(code),w.node);
			rangeWorks = true;
		}
	}
	if (! rangeWorks)
		w.insertAdjacentHTML('afterBegin', '<TABLE STYLE=\"margin: 0px;\"></TABLE>'+code);

	function runScript(element, defer)
	{
		if (element.tagName && (element.tagName == "SCRIPT") && (! element.src)) {
			if (((! element.language) && (! element.type)) ||
			    ((element.language || "").toLowerCase() == "javascript") ||
			    ((element.type || "").toLowerCase() == "text/javascript")) {
				if ((element.defer == defer) &&
				    (! window[defer ? "CM8TplntAsync" : "CM8TplntSync"][x]) &&
				    (element.text.indexOf("window.CM8Tplnt") == -1))
					eval(element.text);
			}
		}
		for (var c = element.firstChild; c; c = c.nextSibling)
			runScript(c, defer);
	}
	runScript(w, false);
	setTimeout(function(){ runScript(w, true); }, 0);
};

CM8CE.CM8TransplantJSFile = function(URL)
{
	var tag = document.createElement('SCRIPT');
	tag.src = URL;
	document.body.insertBefore(tag, document.body.firstChild);
};

CM8CE.showAjax = function(CM8CES, adId, tag, showFunction)
	{
		CM8CES.showAjaxQueue = CM8CES.showAjaxQueue || [];
		CM8CES.showAjaxQueue.push({adId: adId, tag: tag, showFunction: showFunction});
		CM8CE.showAjaxHandle(CM8CES); 
	};
	CM8CE.showAjaxHandle = function(CM8CES)
	{
		if (CM8CES.showAjaxBusy || (CM8CES.showAjaxQueue.length == 0))
			return;
		
		var adData = CM8CES.showAjaxQueue.shift();
		CM8CES.showAjaxBusy = String(adData.adId);
		CM8CES["CM8BWADF_" + adData.adId] = function() {
			CM8CES.showAjaxBusy = false;
			setTimeout(function() { CM8CE.showAjaxHandle(CM8CES); }, 1);
		};
		adData.showFunction(adData.tag);
	};
	
		
		
		return CM8CE;
	}
	
	if (window.CM8OnLoadFormats) {
			var CM8CE = initEcosphere();
			var serial = CM8CE.initRequest(false);
			var CM8CES = CM8CE.serialsData[serial];
		
			CM8CE.CM8ErrorPopup = CM8CE.CM8ErrorPopup || '';
	
	CM8CES.formatsPHs = {};
	
	window.CM8ShowAd = function(F, I)
	{
		if ((!CM8CES) || (! CM8CES.CM8Titles))
			return false;
		
		var PHA = document.getElementsByTagName("DIV");
		for (var PHI = 0; PHI < PHA.length; PHI++) {
			var PHE = PHA[PHI];
			if (PHE.id.indexOf("CM8ShowAd") == 0)
				preparePhFormat(PHE);
		}
		
		F = decodeURIComponent(((F.toLowerCase().indexOf("encoded:") == 0) ? F.substring(8) : encodeURIComponent(F)));
		
		var currentScript = ((function(parentElement)
{
	if ((parentElement.tagName == "SCRIPT") && (parentElement.src.indexOf("http://web.checkm8.com") == 0))
		return parentElement;
	for (var childElement = parentElement.lastChild; childElement; childElement = childElement.prevSibling) {
		var recursiveResult = arguments.callee(childElement);
		if (recursiveResult)
			return recursiveResult;
	}
})(document.body) ||
(function(parentElement)
{
	return ((parentElement.tagName != 'SCRIPT') && parentElement.lastChild) ? arguments.callee(parentElement.lastChild) : parentElement;
})(document.body));
		if (! CM8CE.preparePH(CM8CE.lastRequestSerial, currentScript.parentNode, false, false, F))
			return false;

		if (document.getElementById('CM8_FORMAT_' + F) == null)
			document.write('<DIV ID="CM8_FORMAT_' + F + '" STYLE="display:none"></DIV>');
		
		if (CM8CE.formats1Call && (! CM8CE.formats1Call[F]))
			return false;
		if (CM8CE.xformats1Call && CM8CE.xformats1Call[F])
			return false;
		
		CM8CES.formatsPHs[F] = (CM8CES.formatsPHs[F] || 0) + 1;
		
		CM8CE.lastPVPHs[F] = (CM8CE.lastPVPHs[F] || 0) + 1;
	
		var C='CM8ShowAd('+F+((typeof(I)=='number')?(','+I):'')+')';
	
		for (var D = 0; CM8CES.CM8Titles[D] && (CM8CES.CM8Titles[D][0] != F); D++);
		if (! CM8CES.CM8Titles[D])
			return false;
		
		CM8CES.CM8Titles[D][3]++;
	
		var E = CM8CES.CM8Titles[D][4];
	
		if (typeof(I) != 'number')
			for (I = 0; E[I] && E[I].used; I++);
		else if (I < 1) {
			CM8CE.CM8ErrorPopup += '\\n'+C+' - Index '+I+' must be positive (1 and above)';
			return false;
		}
		else
			I--;
	
		if (E[I] && E[I].used) {
			CM8CE.CM8ErrorPopup += '\\n'+C+' - Index '+I+' is called twice';
			return false;
		}
	
		if (E[I] && (! E[I].used)) {
			E[I].used = true;
			E[I][0]();
			return true;
		}
		
		return false;
	};

	CM8CE.sumPHsOf1Call = function()
	{
		var S = '';
		for (var X in CM8CES.formatsPHs) {
			var Y=CM8CES.formatsPHs[X];
			S+='&S'+Y+','+((CM8CE.lastPVPHs[X]||0)-Y)+','+encodeURIComponent(X);
		}

		if (! CM8CE.counts.ph) {
			CM8CE.counts.ph = true;
			S+='&P';
		}
			
		return S;
	};

	function prepare1CallProfile(profile)
	{
		delete CM8CE.formats1Call;
		delete CM8CE.xformats1Call;

		var attrs = profile.split("&");
		for (var i = 0; i < attrs.length; i++) {
			var index = attrs[i].indexOf("=");
			if (index != -1) {
				var attr = attrs[i].substr(0, index);
				if (attr == "format")
					var member = "formats1Call";
				else if (attr == "xformat")
					var member = "xformats1Call";
				else
					var member = null;
				if (member) {
					var formats = attrs[i].substr(index + 1).split(",");
					for (var j = 0; j < formats.length; j++) {
						var format = formats[j];
						if (format) {
							CM8CE[member] = CM8CE[member] || {};
							CM8CE[member][decodeURIComponent(format)] = true;
						}
					}
				}
			}
		}
		
		return profile;
	}

	
				var extra = "";
				if (window.CM8OnLoadFormats != "*") {
					extra = "&format=" + ((window.CM8OnLoadFormats.toLowerCase().indexOf("encoded:") == 0) ? window.CM8OnLoadFormats.substring(8) : encodeURIComponent(window.CM8OnLoadFormats)).replace(/%2C/g, ",");

					extra = extra.replace("&format=!", "&xformat=");					
				}
				
				document.write("<SCR" + "IPT TYPE='text/javascript' SRC='" +
						CM8CE.buildRequest(
								serial,
								"/adam/detect",
								"req=f" + richMediaX() + "&" +
								prepare1CallProfile(CM8EncodeProfile(window.CM8Profile) + extra)) +
						"'></SCR" + "IPT>");
		}
		else {
			window.CM8ShowAd = window.CM8ShowAd || (function() {});
		}
	
	window.CM8AjaxRefresh = function(FNL, PRF, NEW, CBK, UD)
	{
		if (typeof(NEW) == "function") {
			UD = CBK;
			CBK = NEW;
			NEW = false;
		}
		
		if (arguments.length < 2)
			PRF = window.CM8Profile;

		var CM8CE = initEcosphere();

		for (var otherCat in CM8E) {
			if (otherCat != CM8CE.cat) {
				var otherCM8CE = CM8E[otherCat];
				for (var PHI = 0; PHI < otherCM8CE.placeHolders.length; PHI++) {
					var PHD = otherCM8CE.placeHolders[PHI];
					if (PHD.adId && PHD.own && PHD.element && PHD.element.parentNode) {
						for (var otherCat in CM8E)
							CM8E[otherCat].clearRemovedPlaceHolders(PHD.element);
						while (PHD.element.lastChild)
							PHD.element.removeChild(PHD.element.lastChild);
					}
					if (PHD.adId && PHD.showingElement && PHD.showingElement.parentNode)
						PHD.showingElement.parentNode.removeChild(PHD.showingElement);
				}
			}
		}
		
		for (var otherCat in CM8E) {
			if (otherCat != CM8CE.cat) {
				var otherCM8CE = CM8E[otherCat];
				for (var adId in otherCM8CE.spotlesses) {
					var adData = otherCM8CE.spotlesses[adId];
					if (adData.cleanup)
						adData.cleanup();
				}
				otherCM8CE.spotlesses = {};
			}
		}
		
		PRF = (PRF ? CM8EncodeProfile(PRF) : "");
	
		var serial = CM8CE.initRequest(NEW);
		var CM8CES = CM8CE.serialsData[serial];
		CM8CES.CBK = CBK;
		CM8CES.UD  = UD;

		var divs = CM8CE.generateDivsParams(FNL, serial, false);

		CM8CE.CM8TransplantJSFile(CM8CE.buildRequest(
				serial,
				"/adam/detect",
				"req=f" + richMediaX() +
				"&tag=ajx" + divs + "&" + PRF));
	
		return serial;
	};

	window.CM8AjaxAbort = function(serial)
	{
		var CM8CE = window.CM8E[decodeURIComponent(((CM8Cat.toLowerCase().indexOf("encoded:") == 0) ? CM8Cat.substring(8) : encodeURIComponent(CM8Cat)))];
		if (CM8CE) {
			var CM8CES = CM8CE.serialsData[serial];
			CM8CES.aborted = true;
		}
	};
	
	window.CM8AjaxGetFormatAd = function(FMT)
	{
		FMT = encodeURIComponent(FMT);
		for (var cat in CM8E) {
			var CM8CE = CM8E[cat];
			for (var PHI = 0; PHI < CM8CE.placeHolders.length; PHI++) {
				var PHD = CM8CE.placeHolders[PHI];
				if ((PHD.format == FMT) && PHD.adId) {
					for (var E = PHD.element; E; E = E.parentNode)
						if (E == document.documentElement)
							return PHD.adId;
					for (var E = PHD.showingElement; E; E = E.parentNode)
						if (E == document.documentElement)
							return PHD.adId;
				}
			}
		}
		return 0;
	};
	
	window.CM8ResetBanners = function()
	{
		for (var cat in CM8E) {
			var CM8CE = CM8E[cat];
			CM8CE.clearRemovedPlaceHolders();
		}
	};
	
	window.CM8AjaxGetPlaceHolderAd = function(PH)
	{
		for (var E = PH; E; E = E.parentNode)
			if (E == document.documentElement)
				for (var cat in CM8E) {
					var CM8CE = CM8E[cat];
					for (var PHI = 0; PHI < CM8CE.placeHolders.length; PHI++) {
						var PHD = CM8CE.placeHolders[PHI];
						if (PHD.element == PH)
							return PHD.adId;
					}
				}
		return 0;
	};
	
	window.CM8RemoveSpotlessAds = function()
	{
		for (var otherCat in (window.CM8E || {})) {
			var otherCM8CE = CM8E[otherCat];
			for (var adId in otherCM8CE.spotlesses) {
				var adData = otherCM8CE.spotlesses[adId];
				if (adData.cleanup)
					adData.cleanup();
			}
			otherCM8CE.spotlesses = {};
		}
	};

})();
