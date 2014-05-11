var page_url = "http://" + window.location.hostname + document.getElementById("rtbCommentsCount").getAttribute("path");  
var appkey = "dev.cell.com";   
var query = "childrenof:'" + page_url + "' -state:ModeratorDeleted,SystemFlagged,CommunityFlagged,ModeratorFlagged -user.state:ModeratorBanned,ModeratorDeleted safeHTML:permissive children -state:ModeratorDeleted,SystemFlagged -user.state:ModeratorBanned,ModeratorDeleted";  

new Echo.Counter({
    "target": document.getElementById("rtbCommentsCount"),
    "appkey": appkey,
    "query": query,
    "liveUpdates": false,
    "liveUpdatesTimeout": 60
});