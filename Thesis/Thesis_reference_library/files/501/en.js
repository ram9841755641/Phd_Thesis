/* */
if (!Echo) Echo = {};
if (!Echo.Localization) Echo.Localization = { labels: {} };

/* Forum */
Echo.Localization.extend({
	"commentsTitle": "Comments",
    "moderation": "Moderation Mode",
	"streamSortRecent": "Most Recent",
	"streamSortPopular": "Popular Now",
	"streamSortOldest": "Oldest First",
	"streamSortRating": "Most Likes",
	"adminToggleModeration": "Toggle Moderation",
	"flashMsgModertation": "Comment awaiting moderation.",
	"flagFeedback": "Thanks for the feedback. We've noted it.",
	"maxChars": "Maximum message limit is {LIMIT} characters."
}, "RealTidbitsComments");

/* file upload */
Echo.Localization.extend({
	"attachPhoto": "+ Photo",
	"actionString": "Include a note here...",
	"noPhotosUploaded": "No files were uploaded!",
	"uploadNotComplete": "Please wait until all files have been uploaded."
}, "Plugins.FileUpload");

/* tokbox */
Echo.Localization.extend({
	"attachWebVideo": "+ Video",
	"titleRecord": "Record Your Comment:",
	"titlePlayback": "Comment Playback:",
	"buttonCancel": "Cancel",
	"buttonDelete": "Delete Recording"
}, "Plugins.Tokbox");

/* UpdateSort */
Echo.Localization.extend({
    "sortLabel": "Sort By:"
}, "Plugins.UpdateSort");

/* RSS Feed */
Echo.Localization.extend({
    "link": " "
}, "Plugins.RSSFeed");

/* Share */
Echo.Localization.extend({
	"sharePrompt": "Share your comment:",
	"shareLabel": "Share"
}, "Plugins.JanrainSharingv2");

/* Email Subscribe */
Echo.Localization.extend({
	"submitSubscribe": "Follow Conversation",
	"link": " ",
	"subscribeButton": "Subscribe",
	"cancelButton": "Cancel",
	"enterEmail": "Enter your email to follow this conversation:",
	"noEmail": "No email available to subscribe you to replies to this comment.",
	"success": "Your are now subscribed to new replies.",
	"notValid": "Email address is not valid."
}, "Plugins.LMKSubscription");

/* Edit */
Echo.Localization.extend({
	"edit": "Edit",
	"editSource": "Edit Source",
	"editControl": "Edit",
	"updating": "Updating..."
}, "Plugins.EditForum");

/* FormAuth */
Echo.Localization.extend({
    "youMustBeLoggedIn": "You must be logged in to comment"
}, "Plugins.FormAuth");

/* Reply */
Echo.Localization.extend({
    "replyControl": "Reply"
}, "Plugins.Reply");

/* Items in Echo Stream Client */
Echo.Localization.extend({
	"defaultModeSwitchTitle": "Switch to metadata view",
	"guest": "Guest",
	"today": "Today",
	"yesterday": "Yesterday",
	"lastWeek": "Last Week",
	"lastMonth": "Last Month",
	"secondAgo": "Second Ago",
	"secondsAgo": "Seconds Ago",
	"minuteAgo": "Minute Ago",
	"minutesAgo": "Minutes Ago",
	"hourAgo": "Hour Ago",
	"hoursAgo": "Hours Ago",
	"dayAgo": "Day Ago",
	"daysAgo": "Days Ago",
	"weekAgo": "Week Ago",
	"weeksAgo": "Weeks Ago",
	"metadataModeSwitchTitle": "Return to default view",
	"monthAgo": "Month Ago",
	"monthsAgo": "Months Ago",
	"sharedThisOn": "I shared this on {service}...",
	"userID": "User ID:",
	"fromLabel": "from",
	"viaLabel": "via"
}, "Item");

/* Echo Stream Client controls */
Echo.Localization.extend({
	"guest": "Guest",
	"live": "Live",
	"paused": "Paused",
	"more": "More",
	"loading": "Loading...",
	"emptyStream": "No items at this time...",
	"waiting": "Building view (This may take a moment)...",
	"new": "new"
}, "Stream");

/* Echo Submit Form */
Echo.Localization.extend({
	"createdBy": "Created by",
	"loading": "Loading...",
	"markers": "Markers:",
	"markersHint": "Marker1, marker2, marker3, ...",
	"on": "on",
	"post": "Post",
	"posting": "Posting...",
	"tagsHint": "Tag1, tag2, tag3, ...",
	"tags": "Tags:",
	"update": "Update",
	"updating": "Updating...",
	"yourName": "Your Name (required)",
	"yourWebsiteOptional": "Your website (optional)"
}, "Submit");

/* Echo Auth controls */
Echo.Localization.extend({
	"edit": "Edit",
	"loading": "Loading...",
	"login": "Login",
	"logout": "Logout",
	"loggingOut": "Logging out...",
	"or": "or",
	"signup": "signup"
}, "Plugins.Auth");