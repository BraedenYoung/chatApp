this.date = new Date().getTime();

emit('messages:create', this); 



if(this.length > 4){
 
     
        dpd.messages.del({id: messages[0].id}, function(result, error){
        emit('messages:delete', this);
        });

}

  /* dpd.messages.get({roomID: this.roomID}, function(messages){
        if(messages.length > 4){
            var oldestDate = messages[0];
            messages.forEach(function(message){
                if(oldestDate.date > message.date)
                    oldestDate = message;
            });
            dpd.messages.del({id:oldestDate.id});
            emit('messages:delete', this);
        }
    });  
    */