var shortCutBuilder = function(){
  var methods = {};
  var scName = '';
  var path      = ''; 
  var objShortcut = new ActiveXObject('WScript.shell');
  var make = function(shortcutName, filePath){
    try{
      scName = shortcutName;
      path      = filePath; 
      var file = objShortcut.CreateShortcut( scName );
      file.TargetPath = 'file:/' + path;
      file.save();
      objShortcut = null;
    }catch(e){
      WScript.echo('exception shortCut.make ' + e.name + " " + (e.number & 0xFFFF) + ''  + e.message );
    }
    return true;
  }
  methods.make = make;
  return methods;
}
var shortcutName = 'test.lnk';
var path               = 'C:/shared/test.js';
shortCutBuilder().make( shortcutName,path );
