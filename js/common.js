console.log("Included common...");
ngui = require('nw.gui');
gui = require('nw.gui');
nwin = ngui.Window.get();
fs = require("fs");
editor = ace.edit("editor");
markdown = require("markdown").markdown;
io = require("socket.io")(8081);
fs = require("fs");