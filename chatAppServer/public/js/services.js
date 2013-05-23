chatApp.factory('chat', function($rootScope) {
 	var chatService = {};
  var chatList = [];

  function getChatList(){
    return dpd.chat.get(function(chats){
      return chats;
    });
  };

  chatService.getConversation = function(){

    return getChatList();
  };

  chatService.addMessage = function(user, message){
    var newMessage = {userid: user, message: message, date: new Date()};
    return dpd.chat.post(newMessage, function(todo, err) {
         if (err) {
           // An error could be either the err.message property, or err.errors.title, so we account for either case
           alert(err.message || (err.errors && err.errors.title));
           return;
         }
    });
  };
	return chatService;
});
