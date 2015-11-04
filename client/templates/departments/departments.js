Template.departments.helpers({
    departments: function () {
        var departments = [];

        var users = Meteor.users.find({}).fetch();
        var verifiedUser = _.filter(users, function(user) {
            var emails = user.emails;
            if(_.isEmpty(emails)){
                return false;
            }else{
                var verified = _.chain(emails).pluck('verified').some().value();
                return verified;
            }
        });

        var groupDepartment = _.groupBy(verifiedUser, function(user){
            return user.profile.department;
        });

        for(var key in groupDepartment){
            var department = {
                department: key,
                members: groupDepartment[key]
            };
            departments.push(department);
        }

        return departments;
    }
});