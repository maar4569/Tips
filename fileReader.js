/************************************/
/* file reader */
/************************************/
var fileReader = function(name,fileEncode){
  var fileName = name;
  var shift_jis   = 'shift_jis';
  var utf-8      = 'utf-8';
  var methods  = {};
  var encode = fileEncode;
  var fso      = new ActiveXObject('Scripting.FileSystemObject');
  if (encode.toLowerCase() == utf-8) {
    fso      = new ActiveXObject('ADODB.Stream');
    fso.type      = 2;
    fso.charset = encode;
  }

  //read
  var read = function( callBackFunc ){
    try{
      var cbFuncs = callBackFunc();
      var dataList = cbFuncs.getData();
      if(encode== utf-8 ){
        fso.open();
        fso.loadFromFile( fileName );
        while(!fso.EOS){
          if ( typeof(callBackFunc) == 'function' ){
            var cbFuncs = callBackFunc( fso.readText(-2) ,dataList);
            var dataList2 = cbFuncs.getData();
          }else{
            return -1
          }
        }
        fso.close();
     }else{
        var textStream = fso.OpenTextFile(fileName);
        while(textStream.AtEndOfLine == false){
          if ( typeof(callBackFunc) == 'function' ){
            cbFuncs = callBackFunc(textStream.ReadLine(),dataList);
            var dataList2 = cbFuncs.getData();
          }else{
            return -1
          }
        }
      }
      return dataList2;
    }catch(e){
        WScript.echo('exception fileReader.read ' + e.name + " " + (e.number & 0xFFFF)  + e.message );
      return e;
    }
  }
  methods.read = read;
  return methods;
}
//callback. It must be customized.
//calbackの作り方
//datalistとdefaultListの型は同じにする。
//your codeで囲まれた部分にコードを記述する。
//編集したデータは必ずdatalistに入れる。

//var callBackAfterReadLine = function(line,datalist){
// var defaultList = {};  //required. defaultList and datalist must be a same data format.
//  var methods  = {};
//  if (arguments.length != 0){
//    // your code start */
//    var aryText = line.split(',');
//    datalist[aryText[0]] = line;  // required
//    // your code  end  */
//    var getData = function(){ return datalist;}
//  }else{
//    var getData = function(){ return defaultList;}
//  }
//  //methods
//  methods.getData = getData;
//  return methods;
//}
