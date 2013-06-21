chatApp.controller('chatController', function($scope, chatRoom){

	$scope.messages = chatRoom.getMessages();	
	$scope.users = chatRoom.getUsers();	    	
	$scope.message = chatRoom.messageText;
	$scope.sender = "";
	//$scope.username = "";


	dpd.messages.on('create', function(message) {
    	$scope.messages = chatRoom.getMessages();
    	$scope.$apply();
  	});

	dpd.messages.on('delete', function(message) {
    	$scope.messages = chatRoom.getMessages();
    });

  	dpd.users.on('create', function(users){
  		debugger;
  		$scope.users = chatRoom.getUsers();
  		//$scope.apply();
  	})
	
	$scope.addMessage = function(){
		chatRoom.addMessage($scope.sender,$scope.message);
	}	
	
	$scope.addUser = function(){
		chatRoom.addUser($scope.sender);
	}

	$scope.getDate = function(date){
		return chatRoom.getDate(date);
	}
});