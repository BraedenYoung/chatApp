
//Non of this code is working :(

if (!(this.username.length > 2 && this.username.length < 20)) {
    error('sender', "Screen name must be between 2 and 50 characters");
}

dpd.users.get({roomID: this.roomID}, function(users){
    users.forEach(function(user){
        if(this.username == user.username){
            error('message', "Sorry, that name is already in use");
        }
    });    
});