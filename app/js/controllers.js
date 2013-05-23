

function MainCtrl($scope, chat) {
 $scope.conversation = chat.getConversation();


 $scope.addMessage = function(user, message){

    chat.addMessage(user,message);
 };
 $scope.addUser = function(user){

 	chat.addUser(user);
 }
 $scope.removeUser = function(user){
 	
 	chat.removeUser(user);
 }


 $scope.user = "";
 $scope.message = "";


}
