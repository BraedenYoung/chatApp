chatApp.factory('chatRoom', function($routeParams, $http, blowfish){
  

var roomService = {};

 roomService.messageText = "";

 roomService.roomID = $routeParams.roomID;

 roomService.gotoRoom = function(){
    window.location = "#/chatRoom/"+$scope.roomID;

 };
 roomService.getMessages = function(key){
  return $http.get('/messages?roomID='+roomService.roomID)
  .success(function(messages){
    
    messages.forEach(function(message){
      if(message.message){
      message.message = blowfish.decrypt(message.message);
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
    encryptedMessage = blowfish.encrypt(message); 
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
    return users.data;
  }).error(function(err){
    return alert(err.message || "Sorry, someone is already using that name");
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
          $http.delete('/users?=' + user.id,{
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



chatApp.factory('blowfish', function(){

var blowfishService = {};

  blowfishService.init = function(key){
    if(key){
      var bf = new Blowfish(key);
    }else{
      var bf = new Blowfish('123456');
    }
  }
  blowfishService.encrypt = function(message) {
    return blowfishService.toAscii(message); 
  }
  blowfishService.decrypt = function(asciiString){
    return blowfishService.fromAscii(asciiString);
  }


blowfishService.toAscii = function(message){
 var ascii="";
  if(message.length>0)
    for(i=0; i<message.length; i++)
    {
      var c = " "+message.charCodeAt(i);
      while(c.length < 3)
       c = "0"+c;
      ascii += " " + c;
    }
  return(ascii);
}
blowfishService.fromAscii = function(asciiString){

    var plaintext = "";
    for(var i=0; i<asciiString.length; i++){
      if(asciiString.charAt(i)!=" "){
        console.log(asciiString.substr(i,3));
      plaintext += String.fromCharCode(asciiString.substr(i,3));
      i = i + 3;
      }
    }
    return plaintext;
}



  return blowfishService;
});
