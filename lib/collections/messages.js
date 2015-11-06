Messages = new Mongo.Collection('messages');

Messages.allow({
    insert: function (userId, message) {
        if (userId && userId === message.fromUserId) {
            return true;
        } else {
            return false;
        }
    },
    update: function (userId, message, fieldNames, modifier) {
        if (userId === message.toUserId && _without(fieldNames, 'read').length === 0) {
            return true;
        } else {
            return false;
        }
    },
    remove: function (userId, message) {

    }
});

Meteor.methods({
    readMessages: function (fromUserId) {
        Messages.update({
                fromUserId: fromUserId,
                toUserId: this.userId,
                read: false
            },
            {
                $set: {read: true}
            },
            {
                multi: true
            });
    }
});

