var images = null;
var id = null;
var imageIndex = null;
var imageLength = null;
var startImageId = null;
var labelControl = null;
var imageCountStatusControl = null;
var imageCounter = 1;
var boolBtnClick = false;
var fullsizeUrl = null;
var selectedLinkId = null;

//This function shows the WebDialogWindow control
function showSlideShow() {
    setSlideShowProperty(true);
    boolBtnClick = true;
    showImage();
}

function showSlideShowByPostBack() {
    setSlideShowProperty(true);
    showImage();
}

function setSlideShowProperty(isShow) {

    if (isShow) {
        if ($.browser.msie != null && $.browser.msie == true && document.documentMode < 8) {
            if ($get('ej-social-network-div')) {
                $('#ej-social-network-div > div').each(function () {
                    $(this).hide();
                });
            }
        }
        $("#ArticleImageDialogModal").dialog("open");
    }
    else {
        if ($.browser.msie != null && $.browser.msie == true && document.documentMode < 8) {
            if ($get('ej-social-network-div')) {
                $('#ej-social-network-div > div').each(function () {
                    $(this).show();
                });
            }
        }
        $("#ArticleImageDialogModal").dialog("close");
    }
}

function MovePrevious() {
    if (images[imageIndex].previousImageId == '') {
        imageCounter = imageLength.value;
        getLastImage();
    }
    else {
        imageIndex = images[imageIndex].previousImageId;
        imageCounter = imageCounter - 1;
    }

    var imageurl = images[imageIndex].originalUrl; ;
    setImage(imageurl);

    labelControl.innerHTML = images[imageIndex].description;
    imageCountStatusControl.innerHTML = imageCounter + " of " + imageLength.value;
}

function MoveNext() {
    if (images[imageIndex].nextImageId == '') {
        imageCounter = 1;
        getFirstImage();
    }
    else {
        imageIndex = images[imageIndex].nextImageId;
        imageCounter = imageCounter + 1;
    }

    var imageurl = images[imageIndex].originalUrl; ;
    setImage(imageurl);

    labelControl.innerHTML = images[imageIndex].description;
    imageCountStatusControl.innerHTML = imageCounter + " of " + imageLength.value;
}

function showFullSizeByImageID(imageID) {
    imageIndex = imageID;

    if (images == null) {
        images = Global_GetImagesCollection();
    }

    ShowFullSize();
}

function ShowFullSize() {
    if (images) {
        if (images[imageIndex].windowId.match('-')) {
            var windowId = images[imageIndex].windowId.replace('-', '_');
            window.open(images[imageIndex].fullsizeUrl, windowId, 'width=800,height=600,toolbar=no,location=no,status=no,directories=no,scrollbars=yes,menubar=no,resizable=yes')
        }
        else {
            window.open(images[imageIndex].fullsizeUrl, images[imageIndex].windowId, 'width=800,height=600,toolbar=no,location=no,status=no,directories=no,scrollbars=yes,menubar=no,resizable=yes')
        }
    }
    else {
        OpenImageInFullSize(fullsizeUrl);
    }
}

function showImage() {
    if (getImageUrl() != null && getImageUrl().value != '') {
        showSlideShowFromDisplayControl(getImageUrl().value, getImageSourceTitle().value, getImageSourceUrl().value, getImageSourceInfo().value, getImageKey().value, getDescription().value, getImageFullSizeUrl().value, getImageGalleryUrl().value);
    }
    else {
        imageLength = document.getElementById("NoOfImages");
        startImageId = getPopupImageId();
        imageIndex = startImageId.value;
        images = Global_GetImagesCollection();
        if (boolBtnClick == true) {
            getFirstImage();
        }
        var imageurl = images[imageIndex].originalUrl; ;
        setImage(imageurl);
        boolBtnClick = false;
        setImageCounter();

        labelControl = getImageDescription();
        labelControl.innerHTML = images[imageIndex].description;

        imageCountStatusControl = getImageCountStatus();
        imageCountStatusControl.innerHTML = imageCounter + " of " + imageLength.value;
    }
}

function showSlideShowFromDisplayControl(oURL, sourceName, sourceUrl, sourceInfo, imageKey, imageDescription, fullsizeurl,imageGalleryUrl) {
  
    setSlideShowProperty(true);

    $(".ej-iv-source-article a").html(sourceName);
    $(".ej-iv-source-article a").click(function () { slideShow_NavigateToUrl(sourceUrl) });
    $(".ej-iv-view-gallery a").click(function () { slideShow_NavigateToUrl(imageGalleryUrl) });
    $(".ej-iv-source-citation").html(sourceInfo);

    $("#anchorPrev").remove();
    $("#anchorNext").remove();

    setImage(oURL);
    labelControl = getImageDescription();
    labelControl.innerHTML = imageDescription;
    fullsizeUrl = fullsizeurl;
    selectedLinkId = imageKey;

    if (getImageUrl() != null) {
        getImageUrl().value = oURL;
    }
    if (getDescription() != null) {
        getDescription().value = imageDescription;
    }
    if (getImageSourceTitle() != null) {
        getImageSourceTitle().value = sourceName;
    }
    if (getImageSourceUrl() != null) {
        getImageSourceUrl().value = sourceUrl;
    }
    if (getImageSourceInfo() != null) {
        getImageSourceInfo().value = sourceInfo;
    }
    if (getImageKey() != null) {
        getImageKey().value = imageKey;
    }
    if (getImageFullSizeUrl() != null) {
        getImageFullSizeUrl().value = fullsizeurl;
    }
    if (getImageGalleryUrl() != null) {
        getImageGalleryUrl().value = imageGalleryUrl;
    }

    if (getkeyword().value != '') {
        HighlightSearchTermsForSlide();
    }
}

//Set the properties of images
function setImageProperties(src, alt) {
    getArticleImage().src = src;
    getArticleImage().alt = alt;
}

function setImageCounter() {
    imageCounter = 1;

    var image;
    for (image in images) {
        if (imageIndex == image.toString()) {
            break;
        }
        else {
            imageCounter = imageCounter + 1;
        }
    }
}

function getFirstImage() {
    imageIndex = startImageId.value;
    while (images[imageIndex].previousImageId) {
        imageIndex = images[imageIndex].previousImageId;
    }
}

function getLastImage() {
    imageIndex = startImageId.value;
    while (images[imageIndex].nextImageId) {
        imageIndex = images[imageIndex].nextImageId;
    }
}
// onclicking on the particular image showSlideShow.
function showSlideShowByImageID(imageID) {
    var popupImageId = getPopupImageId();
    if (popupImageId != null && imageID != null) {
        popupImageId.value = imageID;
    }
    setSlideShowProperty(true);
    showImage();
}

// This method will open an image in a new browser window.
function OpenImageInFullSize(FullSizeURL) {
    window.open(FullSizeURL, '', 'width=800,height=600,toolbar=no,location=no,status=no,directories=no,scrollbars=yes,menubar=no,resizable=yes')

}

// Determines how to display the image - if showFullViewOnClick is true then show image in new browser window , otherwise show it in slideshow.
function showImageByID(imageID, showFullViewOnClick) {
    showFullViewOnClick = showFullViewOnClick.toLowerCase();
    if (showFullViewOnClick == "true") {
        showFullSizeByImageID(imageID);
    }
    else {
        showSlideShowByImageID(imageID);
    }
}

// on clicking on the particular title of the image
function slideShow_EmailLinkClicked(linkId) {
    if (selectedLinkId) {
        linkId = selectedLinkId;
    }
    addToMyCollectionsLinkClicked(linkId);
    var hidden = getCallshowImage();
    if (hidden != null) {
        hidden.value = true;
    }
    var popupImageId = getPopupImageId();
    if (popupImageId != null) {
        popupImageId.value = linkId;
    }
    var id = getEmailTOColleaguePopupID()._id;
    $find(id).show();
}

// on clicking on the particular title of the image
function slideShow_addToMyCollectionsLinkClicked(linkId) {
    if (selectedLinkId) {
        linkId = selectedLinkId;
    }
    addToMyCollectionsLinkClicked(linkId);
    var hidden = getCallshowImage();
    if (hidden != null) {
        hidden.value = true;
    }
    //After post back add to my collection.
    var popupImageId = getPopupImageId();
    if (popupImageId != null) {
        popupImageId.value = linkId;
    }
    var id = getFavoritePopupID()._id;
    $find(id).show();
}


function slideShow_ExportToPPT(imgID) {
    if (selectedLinkId) {
        imgID = selectedLinkId;
    }
    if (getIsExportToPPT() != null) {
        getIsExportToPPT().value = 'true';
    }
    __doPostBack("PopUpActionDropDown", imgID);
    getIsExportToPPT().value = 'false';
}


function HighlightSearchTermsForSlide() {

    var c = new Array();
    var d = getkeyword();
    if (d != null && d.value != null) {
        c = d.value.split(' ');
        if (null != c && c.length > 0) {
            for (var i = 0; i < c.length; i++) {
                if (c[i] != '') {
                    HighlightKeywordForSlideShow(c[i])
                }

            }
        }
    }
}


function HighlightKeywordForSlideShow(inputId) {
    if (inputId != null && labelControl != null) {
        var keyword = null;
        var cssHighlight = null;

        //get the value in checkbox
        keyword = inputId;
        //get the actual content of the article
        var body = labelControl.innerHTML;
        var regEx = null;

        cssHighlight = "ej-iv-description-keyword";

        if (keyword != null) {

            var index = keyword.indexOf("*");

            if (index == -1) {
                regEx = new RegExp('(\\b' + keyword + '\\b)', 'ig');
            }
            else {
                regEx = new RegExp('(\\b' + keyword.substr(0, index) + ')', 'ig');
            }

            //replace the keyword by wrapping it in a SPAN tag and then applying css class
            body = body.replace(regEx, '<span class=' + cssHighlight + '>$1<\/span>');
            regEx = new RegExp('(<[^>]*)<span class=' + cssHighlight + '>(' + keyword + ')<\/span>(.*?>)', 'ig');
            body = body.replace(regEx, '$1$2$3');
            //Set the actual content with replaced value
            labelControl.innerHTML = body;
        }
    }
}
