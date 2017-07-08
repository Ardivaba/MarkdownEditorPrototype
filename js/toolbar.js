/*
// Create an empty menubar
var menu = new nw.Menu({type: 'menubar'});

// Create a submenu as the 2nd level menu
var submenu = new nw.Menu();
submenu.append(new nw.MenuItem({ label: 'Save' }));
submenu.append(new nw.MenuItem({ label: 'Save As' }));
submenu.append(new nw.MenuItem({ label: 'Open' }));

// Create and append the 1st level menu to the menubar
menu.append(new nw.MenuItem({
  label: 'File',
  submenu: submenu
}));

menu.append(new nw.MenuItem({
  label: 'Settings',
  submenu: submenu
}));

// Assign it to `window.menu` to get the menu displayed
nw.Window.get().menu = menu;