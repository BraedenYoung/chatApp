chatApp.factory('chat', function($rootScope) {

 	var chatService = {};

  var messageList = [
                      {ID: 001, text: "RA-RA-RA-SKA-TEEE", time: new Date()},
                      {ID: 003, text: "WAT WAT", time: new Date()},
                      {ID: 002, text: "CATS!", time: new Date()}
                    ];
  
  var usersList = [{name:"Jim", ID:001},{name:"Rick", ID:002},{name:"Steve", ID:003}];

  chatService.getConversation = function(){
    return messageList;
  };
  chatService.getUsers = function(){
    return usersList;
  };
  
  chatService.getUserName = function(userID){
    var name = "Anonymous";

    usersList.forEach(function(user){
     
      if(user.ID == userID){
          name =  user.name;
      }
    });
    return name;
  };

    chatService.getUserID = function(userName){ 
    var foundID = 0;
    usersList.forEach(function(user){
  
      if(user.name == userName){

          foundID =  user.ID;
      }
    });
   
    return foundID;
  };


  chatService.addUser = function(user){
    
    var lastID = 0;

    usersList.forEach(function(user){

      if(user.ID != null){
        lastID = user.ID;
      }
    });
    ++lastID;

    var newUser = {ID:lastID, text:" has connected.",  time: new Date()};
    usersList.push({name:user, ID:lastID});
    messageList.push(newUser);
  }

  chatService.removeUser = function(userName){

      var foundID = 0;
    usersList.forEach(function(user){
  
      if(user.name == userName){

          foundID =  user.ID;

      }
    });

    userID = foundID;

    var userLeaving = {ID:userID, text:" has disconnected.",  time: new Date()};
    usersList.forEach(function(user){
      if(user.ID == foundID){
        user = null;
      }

    });
    messageList.push(userLeaving);
  }

  chatService.addMessage = function(userID, message){
   
    var newMessage = {ID: userID, text: message, time: new Date()};

      /*if(messageList.length >= 5){
        for(var i = 0; i < 5; i++){

        messageList[i] = messageList[++i];
        
        }
        messageList.pop();
      }*/

    messageList.push(newMessage);
    
  };


	return chatService;
});
