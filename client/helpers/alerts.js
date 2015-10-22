Alerts = new Mongo.Collection(null);

alertError = function(message) {
    Alerts.insert({type:'error',message: message})
};

alertWarning = function(message){
    Alerts.insert({type:'warning',message: message})
}

alertInfo = function(message){
    Alerts.insert({type:'info',message: message})
}

alertSuccess = function(message){
    Alerts.insert({type:'success',message: message})
}

