var chatApp = angular.module('chatApp', []);

chatApp.config(function($routeProvider, $locationProvider){

 $routeProvider
 .when("/",
  { resolve:{
    app:function($route, $location){
      var id = Math.floor((Math.random()*100000) + 1);
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

