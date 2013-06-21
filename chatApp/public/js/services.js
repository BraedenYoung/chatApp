chatApp.factory('chatRoom', function($routeParams, $http){
  
var roomService = {};

 // roomService.messages = [];

 roomService.messageText = "";

 roomService.roomID = $routeParams.roomID;


 roomService.getMessages = function(){
  return $http.get('/messages?roomID='+roomService.roomID)
  .success(function(messages){
    return messages.data;
  }).error(function(err){
    alert(err);
  });
};
roomService.addMessage = function(sender, message){
  $http.post('/messages',{
    sender: sender,
    message: message,
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
  }).success(function(username){
    roomService.username = "";
    return users.data;
  }).error(function(err){
    return alert(err.message || "Sorry, someone is already using that name");
  });
};


roomService.getDate = function(date){
  return moment(date).fromNow();
}


roomService.runCounter = function(){
      countDown -=1;
      if($scope.countDown>0)
        $timeout(runCounter,1000);
    countDown = 100;
    runCounter();
}

return roomService;
});
