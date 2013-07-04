this.date = new Date().getTime();

emit('messages:create', this); 

 dpd.messages.get({roomID: this.roomID}, function(messages){
    if(messages.length > 4){        
        dpd.messages.del({id: messages[0].id}, function(result, error){ 
             emit('messages:delete', this);
        });
    }
});  
