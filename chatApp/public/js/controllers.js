chatApp.controller('chatController', function($scope, chatRoom){

	$scope.messages = chatRoom.getMessages();		    	
	$scope.message = chatRoom.messageText;
	$scope.sender = "";

	dpd.messages.on('create', function(message) {
    	$scope.messages = chatRoom.getMessages();
    	$scope.$apply();
  	});
  	
	$scope.addMessage = function(){
		chatRoom.addMessage($scope.sender,$scope.message);
		//$scope.$apply();
	}	

	$scope.getDate = function(date){
		return chatRoom.getDate(date);
	}
});