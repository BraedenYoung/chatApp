chatApp.controller('chatController', function($scope, $timeout, chatRoom, cipher){

	$scope.messages = chatRoom.getMessages();	
	$scope.users = chatRoom.getUsers();	    	
	$scope.message = chatRoom.messageText;
	$scope.sender = "";
	$scope.key="";


	//$scope.username = "";


	dpd.messages.on('create', function(message) {
    	$scope.messages = chatRoom.getMessages($scope.key);
    	$scope.$apply();
  	});
	dpd.messages.on('deleted', function(message) {
    	$scope.messages = chatRoom.getMessages();
    });
	 //not working V
	 dpd.users.logout(function(success, err) {
	  if(err) return console.log(err);
	  console.log(success); // true
	});

  	dpd.users.on('create', function(users){ 
  		$scope.users = chatRoom.getUsers();
  	});
 	dpd.users.on('delete', function(users){
 		$scope.users = chatRoom.getUsers;
 	});

	$scope.addMessage = function(){
	
		chatRoom.addMessage($scope.sender, $scope.message, $scope.key);
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
	$scope.addKey = function(){
		cipher.init($scope.key);
	}
	$scope.addKey = function(){
		cipher.convertKey($scope.key);
		
	}
	
	/*
	$scope.countDown = function(){
		return chatRoom.runCounter();
	}
	*/
});