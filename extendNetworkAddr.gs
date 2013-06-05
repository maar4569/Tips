function test(){
  var nwAddr = new Array(192,0,0,0); 
  var masklen = 24;
  extendAddr(nwAddr,masklen);
}

function extendAddr(networkAddr,maskLen){
  var nwAddr2 = new Array('','','','');
  var subNetHanten = new Array('','','','');
  var subNet = getSubnet(maskLen);
  
  //Decimal Network Address to Binary one.
  for(var i = 0 ; i <= 3 ; i++){ nwAddr2[i] = ('0000000' + networkAddr[i].toString(2)).slice(-8); }
  
  //Subnet Mask to Binary and inversion.
  for(var i = 0 ; i <= 3 ; i++){
    var k = ('0000000' + subNet[i].toString(2)).slice(-8);
    for(var j = 0 ; j < k.length ; j++){ subNetHanten[i] = subNetHanten[i] + (k[j] ^ 1); }
  }
  
  //Network Address XOR SubnetMask to make Broadcast Address.
  var broadCastAddr = new Array('','','','');
  for(var i = 0 ; i <= 3 ; i++){
    var tmpBuf2='';
    for(var j = 0 ; j < 8; j++){ tmpBuf2 = tmpBuf2 + (nwAddr2[i][j] | subNetHanten[i][j]) ; }
    broadCastAddr[i] = parseInt(tmpBuf2,2);     
  }
  
  //Extend Address.
  for(var i = networkAddr[0] ; i <= broadCastAddr[0] ; i++){
    for(var j = networkAddr[1] ; j <= broadCastAddr[1] ; j++){
      for(var k = networkAddr[2] ; k <= broadCastAddr[2] ; k++){
        for(var l = networkAddr[3] ; l <= broadCastAddr[3] ; l++){
          if (l != 0 && l !=255){ Logger.log(i + '.' + j + '.' + k + '.' + l);}
        }
      }
    }
  }  
}
function getSubnet(maskLen){
  var subNet = new Array('0','0','0','0');
  var shou = Math.floor(maskLen / 8);
  var amari = maskLen % 8;
  var i10 = 0;
  for ( var i = 0 ; i <= shou -1 ; i++ ){ subNet[i] = parseInt(Math.pow(2, 8) - 1); }
  if (i <= 3){ 
    for (var j = 0 ; j <= amari - 1 ; j++ ){ i10 = i10 + Math.pow(2, 7 - j ); }
    subNet[i] = i10;
  }
  return subNet;
}
