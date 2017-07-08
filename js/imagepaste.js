var clipboard = nw.Clipboard.get();
document.getElementById("editor").addEventListener('paste', function(e) {
	var image = clipboard.get("png", true);
	var imageName = "paste_" + Math.floor(Date.now() / 1000).toString() + ".png";
	fs.writeFileSync("images\\" + imageName, new Buffer(image, 'base64'));
	editor.session.insert(editor.getCursorPosition(), "![Image](\\images\\" + imageName + ")");
});