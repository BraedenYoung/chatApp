chatApp.factory('chatRoom', function($routeParams, $http){
  
var roomService = {};

 // roomService.messages = [];
 roomService.username = "";
 roomService.messageText = "";
 roomService.sender = "";
 roomService.roomID = $routeParams.roomID;


 roomService.getMessages = function(){
  return $http.get('/messages?roomID='+roomService.roomID)
  .success(function(messages){
    return messages.data;
  }).error(function(err){
    alert(err);
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
    password: "0",
    roomID: roomService.roomID
  }).success(function(sender){
    roomService.username = "";
  }).error(function(err){
    return alert(err.message || "An error in the addUser function has occurred");
  });
};

roomService.addMessage = function(sender, message){
  $http.post('/messages',{
    sender: sender,
    message: message,
    roomID: roomService.roomID
  }).success(function(message){

    roomService.messageText = "";
  //roomService.getMessages();
  }).error(function(err){
    return alert(err.message || " An error has occurred");
  });
};

roomService.getDate = function(date){
  return moment(date).fromNow();
}

return roomService;
});
