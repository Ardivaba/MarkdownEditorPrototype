var resize = require("resize-img");
var Split = require("split.js");

var isFullscreen = false;
var showingSavebox = false;

function saveFile() {
	fs.writeFileSync("documents/" + $("#savefield").val(), editor.getSession().getValue(), "utf-8");
	$("#savebox").hide();
	$("#editor").focus();
	editor.focus();
	showingSavebox = false;
}

function openFile(path) {
	$("#savefield").val(require("path").basename(path));
	editor.getSession().setValue(fs.readFileSync(path, "utf-8"));
	data.lastFile = path;
	$("#markdown").html(markdown.toHTML( editor.getSession().getValue() ));
}

$("#savebox").hide();

$(document).on("ready", function() {
	$("#savebox").hide();
});

$("#savebox").keydown(function(e) {
	if(e.keyCode == 13) {
		e.preventDefault();
		saveFile();
		$("#savebox").hide();
		showingSavebox = false;
	}
});

openFile(data.lastFile);

var options = [{
	key: "Alt+Enter",
	active: function() {
		console.log("Entered fullscreen...");
		if(!isFullscreen)
			nwin.enterFullscreen();
		else
			nwin.leaveFullscreen();

		isFullscreen = !isFullscreen;
		//nwin.enterFullscreen();
	},
	failed: function() {
		console.log("Failed to enter fullsceren...");
	}
}, {
	key: "Ctrl+S",
	active: function() {
		$("#savebox").show();
		$("#savefield").focus();
		if(!showingSavebox) {
			$("#savebox").show();
			showingSavebox = true;
		} else {
			showingSavebox = false;
			$("#savebox").hide();
		}
	}
}, {
	key: "Ctrl+O",
	active: function() {
		console.log("Opening sfile...");
		var fileDialog = $("#fileDialog");
		fileDialog.trigger("click");

		fileDialog.unbind("change");
		fileDialog.change(function(e) {
			var fileName = $(this).val();
			openFile(fileName);
		});
	}
}];

for(var i = 0; i < options.length; i++) {
    var shortcut = new ngui.Shortcut(options[i]);
    ngui.App.registerGlobalHotKey(shortcut);
}

console.log("Hotkey registered...");

//editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/markdown");
editor.setFontSize(20);
editor.getSession().setUseWrapMode(true);
editor.setShowPrintMargin(false);

editor.getSession().on("change", function(one, two) {
	$("#markdown").html(markdown.toHTML( editor.getSession().getValue() ));
});

io.on("connection", function(socket) {
	console.log("Hi...");
	console.log(socket);

	socket.on("data", function(counter) {
		console.log("What the fuk?");
		console.log(counter);
	});

	socket.on("img", function(image) {
		console.log("Got image...");
		console.log(image.length);
		var decodedImage = new Buffer(image, "base64").toString("binary");
		var imageName = "android_" + Math.floor(Date.now() / 1000).toString() + ".png";

		console.log("Writing file...");
		require("fs").writeFile("images\\" + imageName, image, "base64", function(err, two) {
			console.log(err);

			resize(fs.readFileSync("images\\" + imageName), { width: 720, height: 540 }).then(buf => {
				fs.writeFileSync("images\\small_" + imageName, buf);
				editor.session.insert(editor.getCursorPosition(), "![Image](\\images\\small_" + imageName + ")");
			});
		});
	});
});