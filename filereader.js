/************************************/
/* file reader */
/************************************/
var fileReader = function(name){
  var fileName = name;
  var methods  = {};
  var fso      = new ActiveXObject('Scripting.FileSystemObject');
  //read
  var read = function( callBackFunc ){
    var textStream = fso.OpenTextFile(fileName);
    try{
      var cbFuncs = callBackFunc();
      var dataList = cbFuncs.getData();
      while(textStream.AtEndOfLine == false){
        if ( typeof(callBackFunc) == 'function' ){
          cbFuncs = callBackFunc(textStream.ReadLine(),dataList);
          var dataList2 = cbFuncs.getData();
        }else{
          return -1
        }
      }
      return dataList2;
    }catch(e){
      WScript.echo('exception fileReader.read ' + e);
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
var callBackAfterReadLine = function(line,datalist){
  var defaultList = {};  //required. defaultList and datalist must be a same data format.
  var methods  = {};
  if (arguments.length != 0){
    /* your code start */
   var aryText = line.split(',');
    datalist[aryText[0]] = line;  // required
    /* your code  end  */
    var getData = function(){ return datalist;}
  }else{
    var getData = function(){ return defaultList;}
  }
  //methods
  methods.getData = getData;
  return methods;
}

//**********************
//main
//**********************
var path = "C:/shared/sample/test.txt";
WScript.echo(path);
var path2 = path;
var pctablecsv = fileReader( path2 );
var ret = pctablecsv.read(callBackAfterReadLine);
//output
for (var key in ret){
  WScript.echo('ret-> ' +  ret[key]); 
}
