data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

var lastDataString = JSON.stringify(data);
setInterval(function() {
	var dataString = JSON.stringify(data);
	
	if(dataString != lastDataString) {
		fs.writeFileSync("data.json", dataString, "utf-8");
		lastDataString = dataString;
	}
}, 100);