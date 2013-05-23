chatApp.factory('chat', function($rootScope) {
 	var chatService = {};

  var messageList = [
                      {user: "Rick", text: "RA-RA-RA-SKA-TEEE", time: new Date()},
                      {user: "Jim", text: "WAT WAT", time: new Date()}
                    ];
  var usersList = [{user:"Mack"},{user:"Braeden"},{user:"steve"}];

  chatService.getConversation = function(){
    return messageList;
  };
  chatService.getUsers = function(){
    return usersList;
  };

  chatService.addUser = function(user){
    var newUser = {usersList:user, text:" has connected.",  time: new Date()};
    usersList.push({usersList:user});
    return messageList.push(newUser);
  }
   chatService.removeUser = function(user){
    var userLeaving = {usersList:user, text:" has disconnected.",  time: new Date()};
    usersList.pull({usersList:user});
    return messageList.push(userLeaving);
  }

  chatService.addMessage = function(user, message){
    var newMessage = {usersList: user, text: message, time: new Date()};

    return messageList.push(newMessage);
  };
	return chatService;
});
