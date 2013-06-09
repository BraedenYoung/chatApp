

function MainCtrl($scope, chat) {
 $scope.conversation = chat.getConversation();
 $scope.userList = chat.getUsers();
 
 $scope.message = "";

 var doneOrChange = true; 

	$scope.addMessage = function(user, message){

	  	return chat.addMessage(user,message);
	};
	$scope.addUser = function(user){

		chat.addUser(user);
	};
	 $scope.removeUser = function(user){
	 	
	 	chat.removeUser(user);
	};
	$scope.getUserName =  function(userID){

		return chat.getUserName(userID);
	};
	$scope.getUserID =  function(userName){

		return chat.getUserID(userName);
	};
	$scope.modifyName = function(userName,choice){
		if(doneOrChange){
			chat.addUser(userName);
			doneOrChange = false;
			return choice = "Change";
		}else{
			chat.removeUser(userName);
			doneOrChange = true;
			return choice = "Done";
		}
	};
	$scope.submit = function() {
	
    if ($scope.message.text) {
    	chat.addMessage(chat.getUserID($scope.user.text), $scope.message.text);
      	$scope.message.text = '';
    }
  };



}
