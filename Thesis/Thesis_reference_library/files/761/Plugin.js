
var pluginFound1 = false;
var pluginFound2 = false;
var pluginFound3 = false;

function plugin_check(action) {
   (navigator.userAgent.indexOf('Win') != -1) ? plugin_check_win(action) : plugin_check_mac(action);
   if (pluginFound1 || pluginFound2 || pluginFound3 )
	return true;
   else
    return false;
}

function plugin_check_mac(action) {
   if(action) {
      detectHDS();
   }
   //document.forms[0].submit();
   return true;
}

function detectHDS() {

    pluginFound1 = detectPlugin('ISIplugin');
    pluginFound2 = detectPlugin('HDSchem');

    //if (pluginFound1 && pluginFound2) {
    if (pluginFound1 || pluginFound2) {
		pluginFound3 = '1';
    }
    else {
		pluginFound3 = '0';
    }
}

function detectPlugin() {
    var daPlugins = detectPlugin.arguments;
    var pluginFound = false;

    if (navigator.plugins && navigator.plugins.length > 0) {
        var pluginsArrayLength = navigator.plugins.length;
        for (pluginsArrayCounter=0; pluginsArrayCounter < pluginsArrayLength; pluginsArrayCounter++ ) {
           var numFound = 0;
           for(namesCounter=0; namesCounter < daPlugins.length; namesCounter++){
             if( (navigator.plugins[pluginsArrayCounter].name.indexOf(daPlugins[namesCounter]) >= 0) || (navigator.plugins[pluginsArrayCounter].description.indexOf( daPlugins[namesCounter]) >= 0) ) {
                    numFound++;
             }
           }
           if(numFound == daPlugins.length) {
              pluginFound = true;
              break;
           }
        }
    }
    return pluginFound;
} 
 
if ((navigator.userAgent.indexOf('MSIE') != -1) && (navigator.userAgent.indexOf('Win') != -1)) {
       document.writeln('<script language="VBscript">');

       document.writeln('\'this next function will detect most plugins');
       document.writeln('Function plugin_ie()');
       document.writeln('  on error resume next');
       document.writeln('  dim obj');
       document.writeln('  set obj = CreateObject("ChemATL.ChemServer.1")');
       document.writeln('  plugin_ie = IsObject(obj)');
       document.writeln('  set obj = Nothing');
       document.writeln('  obj = Empty');
       document.writeln('End Function');

       document.writeln('</scr' + 'ipt>');
}

function plugin_check_win(action){
  if(action) {
    var plugin_nn = navigator.plugins["Hampden Data Services Ltd. Development"];
    if (navigator.appName == "Microsoft Internet Explorer") {
      if (plugin_ie()) {   
       pluginFound3 = 1;
      }
    }
    else {
      if (plugin_nn) {
        pluginFound3 = 1;
      }
    }
  }
  //document.forms[0].submit();
  return pluginFound3;
}



