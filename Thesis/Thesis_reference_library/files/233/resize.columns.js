function resize(elmids)
{
	var elmids = new Array('content', 'extranav', 'journalnav'); //elements to be made equal "height" // [VIEW-3618] - added 'journalnav' - RW.
	getMeasurements(elmids);
}

