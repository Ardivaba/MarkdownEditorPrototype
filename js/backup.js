setInterval(function() {
	fs.writeFileSync("backup.md", editor.getSession().getValue(), "utf-8");
}, 1000 * 10);