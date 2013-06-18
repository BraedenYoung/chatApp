chatApp.factory('chatRoom', function($routeParams, $http){
  var roomService = {};

 // roomService.messages = [];
  roomService.messageText = "";
  roomService.sender = "";
  roomService.roomID = $routeParams.roomID;

  roomService.getMessages = function(){
    return $http.get('/messages?roomID='+ roomService.roomID)
    .success(function(messages){
        return messages;
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
      roomService.getMessages();
    }).error(function(err){
      return alert(err.message || " An error has occurred");
    });
  };

  roomService.getDate = function(date){
    return moment(date).fromNow();;
  }

  return roomService;
});
