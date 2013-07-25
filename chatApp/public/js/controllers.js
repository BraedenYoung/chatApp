
chatApp.controller('chatController', function($scope, $timeout, chatRoom, cipher){



	$scope.messages = chatRoom.getMessages("123456");
	$scope.users = chatRoom.getUsers();
	$scope.message = chatRoom.messageText;
	$scope.sender = "";
	$scope.key="";



	dpd.messages.on('create', function(message, key) {
		if($scope.key){
			$scope.messages = chatRoom.getMessages($scope.key);
		}else{
			$scope.messages = chatRoom.getMessages("123456");
		}	
		$scope.$apply();
	});

  	/*
	dpd.messages.on('deleted', function(message) {
    	$scope.messages = chatRoom.getMessages();
    });
	*/
	dpd.users.on('create', function(users){ 
		$scope.users = chatRoom.getUsers();
		$scope.$apply();
	});
	dpd.users.on('delete', function(users){
		$scope.users = chatRoom.getUsers();
		$scope.$apply();
	});
	

$scope.addMessage = function(){
	if($scope.key){
			chatRoom.addMessage($scope.sender, $scope.message, $scope.key);
		}else{
			chatRoom.addMessage($scope.sender, $scope.message,"123456");
		}	
	
}	
$scope.getMessages = function(){
	if($scope.key){
			chatRoom.getMessages($scope.key);
		}else{
			chatRoom.getMessages("123456");
		}	
	
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

$scope.addKey = function(key){

	chatRoom.getMessages($scope.key);
}
$scope.getKey = function(){
	cipher.getKey($scope.key);
}


	/*
	$scope.countDown = function(){
		return chatRoom.runCounter();
	}
	*/
});