this.date = new Date().getTime();

emit('messages:create', this); 
/*
 dpd.messages.get({roomID: this.roomID}, function(messages){
    if(messages.length > 4){ 
        var temp = 0;
        var i = 0;
        messages.forEach(function(message){
            if(message.date<message.data[temp].date){
            temp = i;
            } 
            i++;
        });
        dpd.messages.del({id: messages.data[temp].id}, function(result, error){ 
             emit('messages:delete', this);
        });
    }
});  
*/
