Template.alert.helpers({
    alert: function () {
        return Alerts.find({});
    }
});

Template.alertDetail.onRendered(function () {
    var alert = this.data;
    Meteor.setTimeout(function () {
        Alerts.remove(alert._id);
    }, 5000);
});
