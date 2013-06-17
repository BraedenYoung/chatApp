function MainCtrl($scope, chat) {



$scope.conversation = function(){
  return chat.getConversation();
};



 $scope.addMessage = function(user, message){
    chat.addMessage(user,message);
 };


 $scope.user = "";
 $scope.message = "";
}
