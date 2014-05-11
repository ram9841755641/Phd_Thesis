/// <FileHeader>
/// <FileName>Journals.js</FileName>
/// <Description>
/// This file will have javascript function for search result page
/// </Description>
/// <Author>Purushottam Sahu</Author>
/// <DateCreated date="24/05/2009"/>
/// <RevisionHistory>
/// <Revision date="" author="">
/// </Revision>
/// </RevisionHistory>
/// </FileHeader>
/* -----------------------------------------------------------------------------------------------------
Start Region - Page Load
-------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {

  
    $("a.BrowseByTitles").click(function(event) {
   
        event.preventDefault();
        if ($(this).attr("selected") == undefined) {
            $("a.BrowseByTitles").each(function() {
                $(this).removeAttr("selected");
                var $parentDiv = $(this).parent("div");
                if ($(this).attr("count") != undefined) {
                    $parentDiv.removeClass("dates_wrap_defaultSelected");
                    $parentDiv.addClass("dates_wrap");
                }
                else {
                    $parentDiv.removeClass("sublinks2_defaultSelected");
                    $parentDiv.addClass("sublinks2");
                }
            });
            if ($(this).attr("url") != null && $(this).attr("url") != undefined) {
                $(this).attr("selected", "true");
                var $parentDiv = $(this).parent("div");
                if ($(this).attr("count") != undefined) {
                    $parentDiv.removeClass("dates_wrap");
                    $parentDiv.addClass("dates_wrap_defaultSelected");
                }
                else {
                    $parentDiv.removeClass("sublinks2");
                    $parentDiv.addClass("sublinks2_defaultSelected");
                }
                loadAtoZList($(this).attr("url"));
            }
        }
    });
});

function loadAtoZList(qStr) {
    var $pls_hldr_journal =  $("#id_pls_hldr_journal");
    var $loader = $("#id_Loader");
    $pls_hldr_journal.hide();    
    $loader.show();
    $pls_hldr_journal.load(qStr, function() {
        $loader.hide();
        $(this).show();
    });
}
/* -----------------------------------------------------------------------------------------------------
End Region - Page Load
-------------------------------------------------------------------------------------------------------*/
function bindElements() {

    var activeflag = false;
    $("#id_az_container_s4 a").each(function() {
        var aToZ = $(this);
        aToZ.addClass("enable");
        var isInactive = true;
        var regex = /[^a-z]/i;
        //aToZ.css("border", "none");
        //aToZ.css("width", "16px");
        $(".jLink").each(function() {
            if ($.trim(aToZ.text()) == $(this).text().substr(0, 1)) {
                //aToZ.css("border", "1px solid green");
                isInactive = false;
                if (!activeflag) {
                    //This makes very first link active which have record
                    //activeflag = true;
                    //aToZ.addClass("active");
                }
                
            }
            
               else if ($.trim(aToZ.text()) == "#" && regex.test($(this).text().substr(0, 1))) {
                          isInactive = false;
                        }
        });
        if (isInactive) {
            aToZ.removeClass("enable");
            aToZ.addClass("Inactive");
        }
    });

    var $alphabetall_childlink = $("#id_Alphabet_all").children("a");

    $alphabetall_childlink.removeClass("Inactive");
    $alphabetall_childlink.addClass("enable");

    $("#id_az_container_s4 a").unbind("click").bind("click", function(event) {
        event.preventDefault();
    });

    $("a.enable").unbind("click").bind("click", function(event) {
        event.preventDefault();
        $("#id_az_container_s4 a").each(function() {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        postPageNumber(1);
        //filterList();
    });

    //page section
    bindPager();

    //filterList();
    postPageNumber(1);
}

function bindCitedByElements() {

    //page section
    bindPager();
    var pageNo = 1;
    var $CitedByPN=$("#CitedByPN");
                if ($CitedByPN.val() != "") {
                    pageNo = $CitedByPN.val();
                }
   postPageNumber(pageNo);
}

function bindPager() {
    //Pager go button click
    $("a.go_button").unbind("click").bind("click", function(event) {
        var $pageTextBox = $(this).parent("div").parent("div").children("div").children("input.page_no_box");
        var pageno = $pageTextBox.val();
        if (validateText($pageTextBox)) {
            postPageNumber(pageno);
        }
    });

    //Handle enter keypress on pagenumber
    $("input.page_no_box").unbind("keydown").bind("keydown", function(event) {
        if (event.keyCode == 13) {
            if (validateText($(this))) {
                postPageNumber($(this).val());
            }
        }
    });

    //Disable Next Previous click
    $("a.PageLinkDisable").unbind("click").bind("click", function(event) {
        event.preventDefault();
    });
    //Next Previous Click
    $("a.PageLink").unbind("click").bind("click", function(event) {
        postPageNumber($(this).attr("Count"));
        if ($(this).attr("title") == "Next") {
            var count = 0;
            count = $(this).attr("count");

            $(this).attr("count", count + 1)
        }
        else {

        }
        event.preventDefault();
    });
}

//Page number validation for text box
function validateText(textBox) {
    var max = eval($("span.totalPages").html());
    var pageindex = eval($("input.txtPageIndex").val());

    var value = textBox.val();
    var orignalValue = value;
    val = value.replace(/[0-9]*/g, "");
    var msg = "Only Integer Values allowed.";
    var $pagenobox = $("input.page_no_box");
    if ((value < 1) || (value > max)) {
        $pagenobox.each(function() {
            $(this).val(pageindex);
        });
        msg = "Integer value is not in range";
        alert(msg);
        return false;
    }
    if (val != '') {
        orignalValue = orignalValue.replace(/([^0-9].*)/g, "")
        $pagenobox.each(function() {
            $(this).val(pageindex);
        });
        alert(msg);
        return false;
    }
    return true;
};

//This function is using to filter item based on AtoZ selection
function filterList() {
    var vCount = 0;
    var id = 0;
    var regex = /[^a-z]/i;
    $(".jLink").each(function() {
    var $parentdivLi = $(this).parent('div').parent('div').parent("li");
        if ($.trim($("a.active").text()) == 'ALL') {            
            $(this).show();
            $parentdivLi.show();
            $parentdivLi.removeAttr("style");
            $parentdivLi.attr("style", "height:auto;");
            if (parseInt(id) % 2 == 0) {
                $parentdivLi.attr("style", 'height:auto;width:454px;background-color:#EEF1F6;float:left;');
            }
            id++;
        }
        else if ($.trim($("a.active").text()) == $(this).text().substr(0, 1)) {
            $(this).show();
            $parentdivLi.show();
            $parentdivLi.removeAttr("style");
            $parentdivLi.attr("style", "height:auto;");
            if (parseInt(id) % 2 == 0) {
                $parentdivLi.attr("style", 'height:auto;width:454px;background-color:#EEF1F6;float:left;');
            }
            id++;
        } 
        else if ($.trim($("a.active").text()) == "#" && regex.test($(this).text().substr(0, 1))) {
                $(this).show();
                $parentdivLi.show();
                $parentdivLi.removeAttr("style");
                $parentdivLi.attr("style", "height:auto;");
                if (parseInt(id) % 2 == 0) {
                    $parentdivLi.attr("style", 'height:auto;width:454px;background-color:#EEF1F6;float:left;');
                }
                id++;
        }
        
        else {
            $(this).hide();
            $parentdivLi.hide();
        };
    });
}

function postPageNumber(pageIndex) {
    //validate text box
    //if (validateText($(".page_no_box"))) {
    //Store current page number value
    $("input.txtPageIndex").val(pageIndex);
    $("#CitedByPN").val(pageIndex);
    var counter = 0;
    var startCounter = 0;
    filterList();
    var $jlinkvisible = $(".jLink:visible");
    var vCount = $jlinkvisible.length;
    if (vCount != 0) {
        setPager(pageIndex, $jlinkvisible.length, PageSize);
    }
    else {
        setPager(pageIndex, TotalCount, PageSize);
    }

    if (pageIndex != 1) {
        startCounter = (pageIndex - 1) * PageSize;
    }
    //alert(startCounter);
    if (vCount != 0) {
        $jlinkvisible.each(function() {
        var $parentdivLi = $(this).parent('div').parent('div').parent("li");
            if (counter >= startCounter && counter < (pageIndex * PageSize)) {
                $(this).show();
                $parentdivLi.show();
            }
            else {
                $(this).hide();
                $parentdivLi.hide();
            }
            counter++;
        });
    } else {
        $(".jLink").each(function() {
        var $parentdivLi = $(this).parent('div').parent('div').parent("li");
            if (counter >= startCounter && counter < (pageIndex * PageSize)) {
                $(this).show();
                $parentdivLi.show();
            }
            else {
                $(this).hide();
                $parentdivLi.hide();
            }
            counter++;
        });
    }
    //}
}

function setPager(_pageIndex, _totalItems, _pageSize) {
    var totalPages = Math.ceil(_totalItems / _pageSize);
    //Set total pages
    $("span.totalPages").html(totalPages);
    //Set Page Index
    $("input.page_no_box").val(_pageIndex);

    var isNextEnable = (_pageIndex < totalPages);
    var isPrevEnable = (_pageIndex > 1);
    var $nextbutton = $("div.next_button");
    //Set next link
    if (isNextEnable) {
        $nextbutton.html('<a title="Next" count="' + (Math.ceil(_pageIndex) + 1) + '" class="PageLink" href="#"><img alt="Next Page" src="' + urlImgNext + '" border="0"></a>');
    } else {
        $nextbutton.html('<a title="Next" count="' + (Math.ceil(_pageIndex) + 1) + '" class="PageLinkDisable" href="#"><img alt="Next Page" src="' + urlImgNextDisable + '" border="0"></a>');
    }


    var $prevbutton = $("div.prev_button");
    //Set previous link
    if (isPrevEnable) {
        $prevbutton.html('<a title="Previous" count="' + (Math.ceil(_pageIndex) - 1) + '" class="PageLink" href="#"><img alt="Previous Page" src="' + urlPrevious + '" border="0"></a>');
    }
    else {
        $prevbutton.html('<a title="Previous" count="' + (Math.ceil(_pageIndex) - 1) + '" href="#" class="PageLinkDisable"><img alt="Previous Page" src="' + urlPreviousDisable + '" border="0"></a>');
    }
    //bind events again
    bindPager();
}