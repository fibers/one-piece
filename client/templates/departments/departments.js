Template.departments.helpers({
    departments: function () {
        var departments = [];

        var users = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
        var groupDepartment = _.groupBy(users, function (user) {
            return user.profile.department;
        });

        for (var key in groupDepartment) {
            var department = {
                department: key,
                members: groupDepartment[key]
            };
            departments.push(department);
        }

        return departments;
    },
    withUser: function () {
        return Session.get('withUser');
    },
    unreadMessagesCount: function (fromUserId) {
        var unreadMessageCount = Messages.find({
            fromUserId: fromUserId,
            toUserId: Meteor.userId(),
            read: false
        }).count();

        return unreadMessageCount > 99 ? "99+" : unreadMessageCount;
    }
});

Template.departments.events({
    'click a': function (e, t) {
        e.preventDefault();

        var clickedItem = $(e.target);
        var withUserId = clickedItem.attr('id');

        var withUser = Meteor.users.findOne(withUserId);
        Session.set('withUser', withUser);
    }
});
