

chatApp.controller('chatController', function($scope,$http,  $routeParams){

	$scope.messages = [];
	$scope.roomID =  $routeParams.roomID;

	//get all the current messages
	$scope.getMessages = function(){	
		$http.get('/messages?roomID='+ $scope.roomID)
		.success(function(messages){
			$scope.loaded = true;
			$scope.messages = messages;
		}).error(function(err){
			alert(err);
		});
	}
	$scope.addMessage = function(sender,message,id){
		$http.post('/messages',{
			sender: sender,
			message: message,
			roomID: id
			
		}).success(function(message){
			$scope.newMessage = "";
			$scope.getMessages();

		}).error(function(err){
			return alert(err.message || " An error has occurred");
		});
	}	
	
	setInterval(function(){ $scope.getMessages() },500);
	


});