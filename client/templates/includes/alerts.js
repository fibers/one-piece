Template.alerts.helpers({
    errors: function() {
        return Alerts.find({type:'error'});
    },
    warnings: function(){
        return Alerts.find({type:'warning'});
    },
    infos: function(){
        return Alerts.find({type:'info'});
    },
    successes: function(){
        return Alerts.find({type:'success'});
    }
});

Template.error.onRendered(function() {
    var error = this.data;
    Meteor.setTimeout(function () {
        Alerts.remove(error._id);
    }, 10000);
});


Template.warning.onRendered(function() {
    var warning = this.data;
    Meteor.setTimeout(function () {
        Alerts.remove(warning._id);
    }, 10000);
});


Template.info.onRendered(function() {
    var info = this.data;
    Meteor.setTimeout(function () {
        Alerts.remove(info._id);
    }, 10000);
});


Template.success.onRendered(function() {
    var success = this.data;
    Meteor.setTimeout(function () {
        Alerts.remove(success._id);
    }, 10000);
});