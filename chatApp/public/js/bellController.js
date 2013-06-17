var chatApp = angular.module('chatApp', []);

chatApp.config(function($routeProvider, $locationProvider){

 $routeProvider
 .when("/",
  {templateUrl:"template/home.html",
  controller:"bellController",
  resolve:{
    app:function($route, $location){
      var id = Math.floor((Math.random()*10000) + 1);
      console.log(id);
      $location.path("/chatRoom/"+id);
    }
  }
})
 .when("/chatRoom/:roomID",
  {templateUrl:"template/chatRoom.html",
  controller:"chatController"
 
  

})
 .otherwise({redirectTo:"/"});
});

chatApp.factory('Room', function(){
  return {roomID: "Generate a new room"};
});

function bellController($scope, Room){

  $scope.room = Room;

  $scope.newRoomID = function(roomID){

    var generatedID = function(){
      var d = new Date();
      var newID = d.getMilliseconds();  

      var temp = "";
      var hold = ""; 

      for(var i = 0; i < 3; i++){
        newID = (newID * newID);
        temp = newID.toString();
        hold = temp.substr(1,temp.length-1);
        if(hold.length < 3)
          hold = parseInt(hold) * newID;
        newID = parseInt(hold);
      }

      if(newID === 'null')
        newID = generatedID();

      return  newID;
    };

    $scope.room.roomID = generatedID();
  } 

}