$.mmsEvents = {};


//Getter/setter for page-level analytics parameters
$.mmsEvents.pageParameters = {};
$.mmsEvents.pageParam = function(name, value) {
    if(value)
        $.mmsEvents.pageParameters[name] = value;
    else
        return $.mmsEvents.pageParameters[name];
};


//Gather page level parameters on page load.
$.mmsEvents.gatherPageInfo = function() {
    //Send session info if this is a new session or if the person just logged in or out
    var isIndividual = $('head meta[name=sessionEvt-individual]').attr('content');
    if(!$.cookie('isIndividual') || ($.cookie('isIndividual') != 'y' && isIndividual == 'y'))
        $.mmsEvents.addMetaSet('sessionEvt');
    $.cookie('isIndividual', isIndividual, { path: '/' });

    //Send page title
    if($('head title').length > 0)
        $.mmsEvents.pageParam('pageTitle', $.trim($('head title').text()));

    //Send standard page parameters
    $.mmsEvents.addMetaSet('evt');


    window['NTPT_PGEXTRA'] = $.param($.mmsEvents.pageParameters);

    //Standard rules for clicks on various elements
    $.each($.mmsEventMappings, function(selector, evt) {
        $(selector).live('click', function(e) {
            var name = (typeof evt.name == "string") ? evt.name : evt.name(this);
            // for each click fire the same event only once
            if (e.mmsEventMappingsFiredFor && e.mmsEventMappingsFiredFor[name]) return;
            e.mmsEventMappingsFiredFor = e.mmsEventMappingsFiredFor || {};
            e.mmsEventMappingsFiredFor[name] = true;
            $.mmsEvent(name, evt.params ? evt.params(this) : {});
        });
    });

    $.each($.mmsEventMappingsMouseDown, function(selector, evt) {
        $(selector).live('mousedown', function(e) {
            var name = (typeof evt.name == "string") ? evt.name : evt.name(this);
            // for each click fire the same event only once
            if (e.mmsEventMappingsFiredFor && e.mmsEventMappingsFiredFor[name]) return;
            e.mmsEventMappingsFiredFor = e.mmsEventMappingsFiredFor || {};
            e.mmsEventMappingsFiredFor[name] = true;
            $.mmsEvent(name, evt.params ? evt.params(this) : {});
        });
    });

    $.each($.mmsEventMappingsKeyDown, function(selector, evt) {
        $(selector).live('keypress', function(e) {
            if (e.which == 13) {
                var name = (typeof evt.name == "string") ? evt.name : evt.name(this);
                // for each click fire the same event only once
                if (e.mmsEventMappingsFiredFor && e.mmsEventMappingsFiredFor[name]) return;
                e.mmsEventMappingsFiredFor = e.mmsEventMappingsFiredFor || {};
                e.mmsEventMappingsFiredFor[name] = true;
                $.mmsEvent(name, evt.params ? evt.params(this) : {});
            }
        });
    });

    $('#sli_search_1').live('keypress', function(e) {
        if (e.keyCode == 13) {
            $('.searchSubmit').click();
        }
    });

};



//Add meta name/value pairs which match a certain filter prefix to the page-level analytics parameters
//e.g. if filter is "test" any <meta> whose name starts with "test-" is sent
$.mmsEvents.addMetaSet = function(filter) {

    $('head meta[name^=' + filter + ']').each(function() {
        var name = $(this).attr('name').substring(filter.length + 1);
        var value = $(this).attr('content');
        $.mmsEvents.pageParam(name, value);
    });
};


//Send an event tag
$.mmsEvent = function(name, data) {
    data = data || {};
    data.ev = name;
    window['NTPT_PGEXTRA'] = '';
    try{
        ntptEventTag($.param(data));
    }catch(ntptEventTag_error){}
};