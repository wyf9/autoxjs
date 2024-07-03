//app.openUrl("anywhere://open?sid=0237");
var r = shell("am start -d anywhere://open?sid=0237");
log(r.result);