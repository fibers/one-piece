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
    return Messages.find({
        $or: [
            {fromUserId: this.userId},
            {toUserId: this.userId}
        ]
    });
});