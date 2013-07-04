chatApp.controller('chatController', function($scope, $timeout, chatRoom, blowfish){

	$scope.messages = chatRoom.getMessages();	
	$scope.users = chatRoom.getUsers();	    	
	$scope.message = chatRoom.messageText;
	$scope.sender = "";
	$scope.key="";


	//$scope.username = "";


	dpd.messages.on('create', function(message) {
    	$scope.messages = chatRoom.getMessages();
    	$scope.$apply();
  	});

	dpd.messages.on('deleted', function(message) {
    	$scope.messages = chatRoom.getMessages();
    });

  	dpd.users.on('create', function(users){ 
  		$scope.users = chatRoom.getUsers();
  	});

 	dpd.users.on('delete', function(users){
 		$scope.users = chatRoom.getUsers;
 	});
	
	$scope.addMessage = function(){
	
		chatRoom.addMessage($scope.sender,$scope.message);
	}	
	
	$scope.addOrDeleteUsers = function(change1){
		if(!change1){
			chatRoom.addUser($scope.sender);
		}else{
			chatRoom.deleteUser($scope.sender);
		}
	}

	$scope.getDate = function(date){
		return chatRoom.getDate(date);
	}
	$scope.deleteMessage = function(){
		chatRoom.deleteMessage();
	}
	$scope.deleteUser = function(){
		chatRoom.deleteMessage();
	}
	
	$scope.addKey = function(){
		blowfish.init($scope.key);
	}
	$scope.getKey = function(){
		return $scope.key;
	}
	
	/*
	$scope.countDown = function(){
		return chatRoom.runCounter();
	}
	*/
});