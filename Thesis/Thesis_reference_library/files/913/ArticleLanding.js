/// <FileHeader>
/// <FileName>ArticleLanding.js</FileName>
/// <Description>
/// This file will have javascript function for Article Landing page
/// </Description>
/// <Author>Jayant I</Author>
/// <DateCreated date="24/05/2009"/>
/// <RevisionHistory>
/// <Revision date="" author="">
/// </Revision>
/// </RevisionHistory>
/// </FileHeader>

function bindPageElements() {

    //page section
    bindTabPager();
    var pageNo = 1;
    var $pageNumberTab=$("#pageNumberTab");
                if ($pageNumberTab.val() != "") {
                    pageNo = $pageNumberTab.val();
                }
   postPageNumberElement(pageNo);
}

function bindTabPager() {
    //Pager go button click
    $("#divCompound a.go_button_").unbind("click").bind("click", function(event) {
        var $pageTextBox = $(this).parent("div").parent("div").children("div").children("input.page_no_box_");
        var pageno = $pageTextBox.val();
        if (validateTabText($pageTextBox)) {
            postPageNumberElement(pageno);
        }
    });

    //Handle enter keypress on pagenumber
    $("#divCompound input.page_no_box_").unbind("keydown").bind("keydown", function(event) {
        if (event.keyCode == 13) {
            if (validateTabText($(this))) {
                postPageNumberElement($(this).val());
            }
        }
    });

    //Disable Next Previous click
    $("#divCompound a.PageLinkDisable_").unbind("click").bind("click", function(event) {
         event.preventDefault();
    });
    //Next Previous Click
    $("#divCompound a.PageLink_").unbind("click").bind("click", function(event) {
        postPageNumberElement($(this).attr("Count"));
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
function validateTabText(textBox) {
    var max = eval($("span.totalPages_").html());
    var pageindex = eval($("input.txtPageIndex_").val());

    var value = textBox.val();
    var orignalValue = value;
    val = value.replace(/[0-9]*/g, "");
    var msg = "Only Integer Values allowed.";
    var $pagenobox = $("input.page_no_box_");
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

function postPageNumberElement(pageIndex) {
    //validate text box
    //if (validateText($(".page_no_box"))) {
    //Store current page number value
    $("input.txtPageIndex_").val(pageIndex);
     $("#pageNumberTab").val(pageIndex);
    var counter = 0;
    var startCounter = 0;
  //  filterList();
    var $jlinkvisible = $(".article_middle_s11");
    $jlinkvisible.show(); 
    var vCount = $jlinkvisible.length;
    if (vCount != 0) {
        setTabPager(pageIndex, $jlinkvisible.length, PageSize);
    }
    else {
        setTabPager(pageIndex, TotalCount, PageSize);
    }

    if (pageIndex != 1) {
        startCounter = (pageIndex - 1) * PageSize;
    }
   
    //alert(startCounter);
    if (vCount != 0) {
          $jlinkvisible.each(function() {
        var $parentdivLi = $(this);
            if (counter >= startCounter && counter < (pageIndex * PageSize)) {
                $(this).show();
                $parentdivLi.show();
                $parentdivLi.attr("visible","true");
            }
            else {
                $(this).hide();
                $parentdivLi.hide();
                $parentdivLi.attr("visible","false");
            }
            counter++;
        });

    } else {
        $(".article_middle_s11").each(function() {
        var $parentdivLi = $(this);
            if (counter >= startCounter && counter < (pageIndex * PageSize)) {
                $(this).show();
                $parentdivLi.show();
                $parentdivLi.attr("visible","true");
            }
            else {
                $(this).hide();
                $parentdivLi.hide();
                $parentdivLi.attr("visible","false");
            }
            counter++;
        });
    }
    
    $("#divCompoundLoader div.group").each(function(){
       if($(this).find("div.article_middle_s11[visible='true']").html()==null)
       {
            $(this).hide();
       }
       else
       {
           $(this).find("div.article_middle_s11[visible='true']").each(function(){
           var sri = $(this).find("div.compound_img").children("a").children("img").attr("sri");
               if(sri != '')
               {
                   $(this).find("div.compound_img").children("a").children("img").attr("src", sri);
                   $(this).find("div.compound_img").children("a").children("img").attr("sri","");
               }
           })
           $(this).show();
       } 
     });
}

function setTabPager(_pageIndex, _totalItems, _pageSize) {
    var totalPages = Math.ceil(_totalItems / _pageSize);
    //Set total pages
    $("span.totalPages_").html(totalPages);
    //Set Page Index
    $("input.page_no_box_").val(_pageIndex);

    var isNextEnable = (_pageIndex < totalPages);
    var isPrevEnable = (_pageIndex > 1);
    var $nextbutton = $("div.next_button_");
    //Set next link
    if (isNextEnable) {
        $nextbutton.html('<a title="Next" count="' + (Math.ceil(_pageIndex) + 1) + '" class="PageLink_" href="#"><img alt="Next Page" src="' + urlImgNext + '" border="0"></a>');
    } else {
        $nextbutton.html('<a title="Next" count="' + (Math.ceil(_pageIndex) + 1) + '" class="PageLinkDisable_" href="#"><img alt="Next Page" src="' + urlImgNextDisable + '" border="0"></a>');
    }

    var $prevbutton = $("div.prev_button_");
    //Set previous link
    if (isPrevEnable) {
        $prevbutton.html('<a title="Previous" count="' + (Math.ceil(_pageIndex) - 1) + '" class="PageLink_" href="#"><img alt="Previous Page" src="' + urlPrevious + '" border="0"></a>');
    }
    else {
        $prevbutton.html('<a title="Previous" count="' + (Math.ceil(_pageIndex) - 1) + '" href="#" class="PageLinkDisable_"><img alt="Previous Page" src="' + urlPreviousDisable + '" border="0"></a>');
    }
    //bind events again
    bindTabPager();
}

function InitialiseEvent(){
    //Click event Expand/Collapse Referenced Articles.
    $(".lnk_txt_msg_head").unbind("click").bind("click", function(event) {
    if ($(this).text() == "Referenced Articles") {
        patentsLess($(this).parent("div"));
            //Call the 'actionMore' function to expand the content.
            actionMore($(this).parent("div"));
            event.preventDefault();
        }
        else {
            //Call the 'actionLess' function to collapse the content.
            actionLess($(this).parent("div"));
            event.preventDefault();
        }
    });
   

    //Click event Expand/Collapse Referenced Articles.
    $(".lnk_img_msg_head").unbind("click").bind("click", function(event) {
        if ($(this).children("img").attr("alt") == "Referenced Articles") {
            patentsLess($(this).parent("div"));
            //Call the 'actionMore' function to expand the content.  
            actionMore($(this).parent("div"));
            event.preventDefault();
        }
        else {
            //Call the 'actionLess' function to collapse the content.
            actionLess($(this).parent("div"));
            event.preventDefault();
        }
    });


    //Click event Expand/Collapse Compound Patents.
    $(".patentsLink").unbind("click").bind("click", function(event) {
    if ($(this).text() == "Patents from SureChem") {
            actionLess($(this).parent("div"));
            //Call the 'patentsMore' function to expand the content.
            patentsMore($(this).parent("div"));
            event.preventDefault();
        }
        else {
            //Call the 'actionLess' function to collapse the content.
            patentsLess($(this).parent("div"));
            event.preventDefault();
        }
    });
    $(".firstlink").unbind("click").bind("click", function(event) {
        if ($(this).text() == "Patents from SureChem") {
           
            actionLess($(this).parent("div"));
            //Call the 'patentsMore' function to expand the content.
            patentsMore($(this).parent("div"));
            event.preventDefault();
        }
        else {
            //Call the 'actionLess' function to collapse the content.
            patentsLess($(this).parent("div"));
            event.preventDefault();
        }
    });

    //Click event Expand/Collapse Compound Patents.
    $(".patentsImgLink").unbind("click").bind("click", function(event) {
    if ($(this).children("img").attr("alt") == "Patents from SureChem") {
        actionLess($(this).parent("div"));
        //Call the 'patentsMore' function to expand the content.
            patentsMore($(this).parent("div"));
            event.preventDefault();
        }
        else {
            //Call the 'patentsLess' function to collapse the content.
            patentsLess($(this).parent("div"));
            event.preventDefault();
        }
    });
 }
    //To collapse Referenced Articles div
    function actionLess($parentDiv) {
        var $parentDivImgLess=$parentDiv.parent(0).children(0).children(".lnk_img_msg_head").children("img");
        $parentDivImgLess.attr("src", urlMore);
        $parentDivImgLess.attr("alt", 'Referenced Articles');
        $parentDivImgLess.attr("alt", 'Referenced Articles');
        
        var $parentDivMsgHeadLess=$parentDiv.parent("div").children(0).children(".lnk_txt_msg_head");
        $parentDivMsgHeadLess.text("Referenced Articles");
        $parentDivMsgHeadLess.attr("title", "Referenced Articles");
        $parentDiv.parent("div").parent("div").children(".msg_body").slideUp();
    }

    //To expand 'Referenced Articles' div
    function actionMore($parentDiv) {
            var $parentDivImgMore=$parentDiv.parent(0).children(0).children(".lnk_img_msg_head").children("img");
            $parentDivImgMore.attr("src", urlLess);
            $parentDivImgMore.attr("alt", 'Collapse');
            $parentDivImgMore.attr("alt", 'Collapse');

            var $parentDivMsgHeadMore=$parentDiv.parent("div").children(0).children(".lnk_txt_msg_head");
            $parentDivMsgHeadMore.text("Collapse");
            $parentDivMsgHeadMore.attr("title", "Collapse");
            var $contentDiv = $parentDiv.parent("div").parent("div").children(".msg_body");
            $contentDiv.slideDown();
            var $pDiv = $contentDiv.children(".refArticleLoader");
            
            //Load the 'Reference Articles'
            LoadReferenceArticles($pDiv) 
        }

        //This function Load the 'Referenced Articles'.        
        function LoadReferenceArticles($pDiv)
        {
         var csid=$pDiv.attr("csid");
         var docid=$pDiv.attr("docid");
         var url = urlReferenceArticle;
            var _post = {
                csID: csid,
                docID:docid
            };
        
            if ($pDiv.attr("title") == "In Progress") {
               $pDiv.load(url, _post);
               $pDiv.attr("title", "Contextual Paragraph");
               $pDiv.show();
            }
        }


        //To collapse Compound Patents div
        function patentsLess($parentDiv) {
            var $parentDivImgLess = $parentDiv.parent(0).children(0).children(".patentsImgLink").children("img");
            $parentDivImgLess.attr("src", urlMore);
            $parentDivImgLess.attr("alt", 'Patents from SureChem');
            $parentDivImgLess.attr("alt", 'Patents from SureChem');

            var $parentDivMsgHeadLess = $parentDiv.parent("div").children(0).children(".patentsLink");
            $parentDivMsgHeadLess.text("Patents from SureChem");
            $parentDivMsgHeadLess.attr("title", "Patents from SureChem");
            $parentDiv.parent("div").parent("div").children(".patents_msg_body").slideUp();
        }

        //To expand 'Compound Patents' div
        function patentsMore($parentDiv) {
            var $parentDivImgMore = $parentDiv.parent(0).children(0).children(".patentsImgLink").children("img");
            $parentDivImgMore.attr("src", urlLess);
            $parentDivImgMore.attr("alt", 'Collapse');
            $parentDivImgMore.attr("alt", 'Collapse');

            var $parentDivMsgHeadMore = $parentDiv.parent("div").children(0).children(".patentsLink");
            $parentDivMsgHeadMore.text("Collapse");
            $parentDivMsgHeadMore.attr("title", "Collapse");
            var $contentDiv = $parentDiv.parent("div").parent("div").children(".patents_msg_body");
            $contentDiv.slideDown();
            var $pDiv = $contentDiv.children(".patentLoader");

            //Load the 'Reference Articles'
            LoadCompoundPatents($pDiv)
        }

        //This function Load the 'Compound Patents'.        
        function LoadCompoundPatents($pDiv) {
            var csid = $pDiv.attr("csid");
            var docid = $pDiv.attr("docid");
            var url = urlCompoundPatents;
            var _post = {
                CSID: csid
            };

            if ($pDiv.attr("title") == "In Progress") {
                $pDiv.css("display","block");
                $pDiv.load(url, _post);
                $pDiv.attr("title", "Patents from SureChem");
                $pDiv.show();
            }
        } 
        



function InitializePager() {

 /* -----------------------------------------------------------------------------------------------------
    Start Region - Result Page Paging
    --------------------------------------------------------------------------------------------------------*/

    //Pager go button click
    $("#" + selectedRegion + " .go_button").unbind("click").bind("click", function(event) {
        var $PageNoTextBox = $(this).parent("div").parent("div").children("div").children(".page_no_box");
        alert($PageNoTextBox);
        if (validateInputText($PageNoTextBox)) {
            var selectedTab = $(this).parent("div").parent("div").parent("div").parent("div").parent("div").parent("div").attr("id");
            alert($PageNoTextBox.val());
            postInputPageNumber($PageNoTextBox.val());
        }
    });
    //Handle enter keypress on pagenumber
    $("#" + selectedRegion + " .page_no_box").keydown(function moveToPage(event) {
        if (event.keyCode == 13) {
            var $PageNoTextBox = $(this).parent("div").parent("div").children("div").children(".page_no_box");
            if (validateInputText($PageNoTextBox)) {
              postInputPageNumber($PageNoTextBox.val());
            }
        }
    });
    //Disable Next Previous click
    $("#" + selectedRegion + " .PageLinkDisable").unbind("click").bind("click", function(event) {
        event.preventDefault();
    });
    //Next Previous Click
    $("#" + selectedRegion + " .PageLink").unbind("click").bind("click", function(event) {
        postInputPageNumber($(this).attr("Count"));
        event.preventDefault();
    });

    //Page number validation for text box
    function validateInputText(textBox) {
        var max = eval($("#" + selectedRegion + " .totalPages").html());
        var pageindex = eval($("#" + selectedRegion + " .txtPageIndex").val());
        var value = textBox.val();
        var orignalValue = value;
        val = value.replace(/[0-9]*/g, "");
        var msg = "Only Integer Values allowed.";

        if ((value < 1) || (value > max)) {
            textBox.val(pageindex);
            msg = "Integer value is not in range";
            alert(msg);
            return false;
        }
        if (val != '') {
            orignalValue = orignalValue.replace(/([^0-9].*)/g, "")
            textBox.val(pageindex);
            alert(msg);
            return false;
        }

        return true;
    };
    
    //});
    /* -----------------------------------------------------------------------------------------------------
    End Region - Result Page Paging
    --------------------------------------------------------------------------------------------------------*/
//Post Page Number to Server
function postInputPageNumber(_page) {
    $("#" + selectedRegion).hide();
    $("#showProgress").show();
    //$("#progressBar").toggle();
    var $tab = $(".ui-tabs-selected a");
    var panel = $("#" + $tab.attr("url"));
    var _post = {
        pageNumber: _page,
        id: _doi,
        title: _title,
        journalName: _journalNames
    };
        $("#" + selectedRegion).load(resultURL, _post, function() {
            //show progress
            $("#showProgress").hide();
            $("#" + selectedRegion).show();
        });
    }
}