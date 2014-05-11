//Allows reading and writing of data embedded in classnames.
//Based on http://www.bram.us/demo/projects/jquery_classdata/
$.mmsClassData = {};


//The character which separates key-value pairs in classnames
$.mmsClassData.separator = '-';


//Returns a regex which matches a key-value pair
$.mmsClassData.pattern = function(key) {
    return new RegExp('(^|[ ]+)' + key + $.mmsClassData.separator + '([^ ]*)[ ]*');
};


//Gets the value for a specified elements' classname key
$.mmsClassData.getData = function(el, key) {
    var matches = el.className.match($.mmsClassData.pattern(key));
        if(matches && matches.length == 3)
            return matches[2];
};


//Read or write data embedded in classnames like this:
//<p class="type-normal">test</p>
//$('p').mmsClassData('type') would return 'normal'
//$('p').mmsClassData('type', 'extended') sets the classname to 'type-extended'
$.fn.mmsClassData = function(key, value) {
    if(value) {
        this.each(function() {
            this.className = this.className.replace($.mmsClassData.pattern(key), ' ');
            $(this).addClass(key + $.mmsClassData.separator + value);
        });

        return this;
    }
    else
        return $.mmsClassData.getData(this.get(0), key);
};


//Define :mmsClassData() selector syntax. Can be used like:
//$('p:mmsClassData(type)') -> filters to all <p>s with classnames like 'type-xyz'
//$('p:mmsClassData(type=extended)') -> filters to just <p>s with the classname 'type-extended'
$.extend($.expr[':'], {
    mmsClassData: function(a, i, m) {
        var parts = m[3].split('=');
        var value = $.mmsClassData.getData(a, parts[0]);
        if(parts.length == 2)
            return value == parts[1]; //Value was specified so it must match
        else
            return value != null; //No value, just check for existance
    }
});