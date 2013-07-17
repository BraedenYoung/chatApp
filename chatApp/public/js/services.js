chatApp.factory('chatRoom', function($routeParams, $http, cipher){


  var roomService = {};

  roomService.messageText = "";

  roomService.roomID = $routeParams.roomID;

  /*
  roomService.init = function(){
    canvasSript.startCanvas(33);
  }
  */

  roomService.gotoRoom = function(){
    window.location = "#/chatRoom/"+$scope.roomID;

  };
  roomService.getMessages = function(key){
    return $http.get('/messages?roomID='+roomService.roomID)
    .success(function(messages){

      messages.forEach(function(message){
        if(message.message){
          message.message = cipher.decrypt(message.message);
        }
      });
      return messages;
    }).error(function(err){
      alert(err);
    });
  };
  roomService.addMessage = function(sender, message){
    var encryptMessage = ''; 
    if(message){
      encryptedMessage = cipher.encrypt(message); 
    }
    $http.post('/messages',{
      sender: sender,
      message: encryptedMessage,
      roomID: roomService.roomID
    }).success(function(message){
      roomService.messageText = "";
    }).error(function(err){
      return alert(err.message || " An error has occurred");
    });
  };
  roomService.getUsers = function(){
    return $http.get('/users?roomID='+roomService.roomID)
    .success(function(users){
      return users.data;
    }).error(function(err){
      alert(err);
    });
  };
  roomService.addUser = function(sender){
    $http.post('/users',{
      username: sender,
      roomID: roomService.roomID
    }).success(function(users){
      roomService.username = "";
    //  return users.data;
    }).error(function(err){
      return alert(err.message || "Sorry, something went wrong while adding you to the conversation. Please refresh your browser and try again.");
    });
  };
  roomService.getDate = function(date){
    return moment(date).fromNow();
  };
  roomService.deleteUser = function(userToBeDeleted){


    return $http.get('/users?roomID='+roomService.roomID)

    .success(function(users){
      users.forEach(function(user){
        if(user.ID == userToBeDeleted.ID){
          dpd.users.del(user.ID, function(success, err) {
            if(err) return console.log(err);
            console.log(success); // true
          });
        }
      });
    }).error(function(err){
      alert(err.message);
    });
  };

/*
roomService.runCounter = function(){
    countDown -=1;
     if($scope.countDown>0)
       $timeout(runCounter,1000);
    countDown = 100;
    runCounter();
};
*/

return roomService;
});



chatApp.factory('cipher', function($window){

var cipherService = {};

cipherService.init = function(key){
  if(key){
    window.key = key;
  }else{
    window.key = "12356";
  }

}



cipherService.encrypt = function(plaintextMessage, key) {

    var encyrptedmessage = cipherService.toAscii(plaintextMessage);
    return cipherService.encryptMessage(encyrptedmessage,key); 

}
cipherService.decrypt = function(encryptedMessage, key){

   var message = cipherService.toAscii(encryptedMessage);
   var plaintextMessage = cipherService.decryptMessage(message);
   return plaintextMessage;
    //cipherService.fromAscii(asciiString);

}
cipherService.toAscii = function(message){
   var ascii="";
   if(message.length>0)
    for(i=0; i<message.length; i++){
      var c = " "+message.charCodeAt(i);
      while(c.length < 3)
       c = "0"+c;
     ascii += " " + c;
   }
   return(ascii);
}
cipherService.fromAscii = function(asciiString){
  var plaintext = "";
  var i = 0;
  // when converting the number back to the character string, the front 0 may be excluded if the ascii number it <100
  /*if(asciiString%3!=0){
    plaintext +=String.fromCharCode(asciiString.substr(i,2));
    i = i+2
  }*/
  for( i ; i<asciiString.length; i++){
    if(asciiString.charAt(i)!=" "){
      plaintext += String.fromCharCode(asciiString.substr(i,3));
      i = i + 3;
    }
  }
  return plaintext;
}
cipherService.convertKey = function(key){
  key = cipherService.toAscii(key);

  var keyArray = key.split(" ");
  var temp = 0;
  key = keyArray[0];
  for(var i = 1; i<keyArray.length; i++){

    temp = keyArray[i];
    key += temp;
  }
}
cipherService.encryptMessage = function(message, key){

  var temp = 0;
  var encryptedMessage="";
  for(var i=0; i<message.length; i++){
    if(message.charAt(i)!=" "){
      temp = parseInt(message.substr(i,3));
      if(temp == 32){
        temp = 31;
      }else if(temp > 126){
        temp = 64;
      }
      encryptedMessage += String.fromCharCode(temp+1);
      i = i + 3;
    }

  }
  return encryptedMessage;
}
cipherService.decryptMessage = function(message, key){
  var plaintextMessage = "";
  var temp = 0;

  for(var i=0; i<message.length; i++){
    if(message.charAt(i)!=" "){
      temp = parseInt(message.substr(i,3));
      if(temp == 32){
        temp = 33;
      }else if(temp == 64){
        temp = 127;
      }
      plaintextMessage += String.fromCharCode(temp-1);
      i = i + 3;
    }
  }
  
  return plaintextMessage;
}
return cipherService;
});
