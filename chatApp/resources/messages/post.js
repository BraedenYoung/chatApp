this.date = new Date().getTime();

emit('messages:create', this); 

 dpd.messages.get({roomID: this.roomID}, function(messages){
    if(messages.length > 4){ 
        var temp = messages.data[0];
        messages.forEach(function(message){
            if(message.date<temp.date){
            temp = message;
            } 
        });
        dpd.messages.del({id: temp.id}, function(result, error){ 
             emit('messages:delete', this);
        });
    }
});  
