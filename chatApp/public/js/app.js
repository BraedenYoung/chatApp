var chatApp = angular.module('chatApp', []);

chatApp.config(function($routeProvider, $locationProvider){

	$routeProvider
	.when("/chatroom/",
		{resolve:{
			app:function($route, $location){
				var id = Math.floor((Math.random()*100000) + 1);
				console.log(id);
				$location.path("/chatroom/"+id);
				$route.reload();
			}
		}
	})
	.when("/home/",
		{templateUrl:"template/home.html"}
		)

	.when("/chatroom/:roomID",
		{templateUrl:"template/chatRoom.html",
		controller:"chatController"

	})
	.otherwise({redirectTo:"/home/"});
});

