Alerts = new Mongo.Collection(null);

alertError = function (message) {
    Alerts.remove({});
    Alerts.insert({type: 'danger', message: message});
};

alertWarning = function (message) {
    Alerts.remove({});
    Alerts.insert({type: 'warning', message: message});
};

alertInfo = function (message) {
    Alerts.remove({});
    Alerts.insert({type: 'info', message: message});
};

alertSuccess = function (message) {
    Alerts.remove({});
    Alerts.insert({type: 'success', message: message});
};

