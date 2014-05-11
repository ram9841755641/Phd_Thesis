$(function() {
    var fullText = $("#col-2 div.cb-contents div.cb-section ol li.full-text-view-link"); //get the affiliate-list
    var buyThis = $("#buy-this-article-link");
    if (buyThis.length > 0) {
        fullText.append(" " + buyThis.html());
    }
});
