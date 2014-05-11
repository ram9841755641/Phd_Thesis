/* Get the Email in col2-col3 socialbookmarking space */
$(document).ready(function() {
    $('#cb-art-soc ol>li:first-child a').each(function(){
        /*Removes 'Email this article' text in content box section 'Shared' */
        var EmailThisArticle = $(this).empty();
        
        /*Adds hover text to email-friend icon that matches social bookmarking text */
        EmailThisArticle.attr('title', 'email this');
    });
});

