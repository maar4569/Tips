/***************************************************/
/* xml file reader */
/***************************************************/
var xmlFileReader = function(name){
  var fileName = name;
  var methods  = {};
  var objXML    = new ActiveXObject('Microsoft.XMLDOM');
  objXML.async = false;
  //load
  var load = function(){
    try{
      objXML.load(fileName);
    }catch(e){
      WScript.echo('exception xmlFileReader.load ' + e.name + " " + (e.number & 0xFFFF) + ''  + e.message );
      return false;
    }
    WScript.echo( typeof(objXML) );
    return methods;
  }
  methods.load = load;
  var getXML = function(){ return objXML; }
  methods.getXML = getXML;
  return methods;
}
