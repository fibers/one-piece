Meteor.publish('allUsers', function () {
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            emails: 1,
            profile: 1
        }
    });
})


Meteor.publish('myMessages', function () {
    var sub = this;
    var handler = Messages.find({
        $or: [
            {fromUserId: this.userId},
            {toUserId: this.userId}
        ]
    }).observeChanges({
        added:function(id, message){
            sub.added('messages', id, message);
        },
        changed: function(id, fields){
            sub.changed('messages', id, fields);
        },
        removed: function(id){
            sub.removed('messages', id);
        }
    });

    sub.ready();
    sub.onStop(function(){
        handler.stop();
    });
});