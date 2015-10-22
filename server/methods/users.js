Meteor.users.allow({
    insert: function(userId, user){
        return !userId;
    }
});


Meteor.methods({

    validateEmail: function (email) {

        check(email, String);

        this.unblock();

        if(Accounts.findUserByEmail(email)){
            throw ERROR_USERNAME_ALREADY_EXISTS;
        }

        var result = HTTP.post(Meteor.settings.exmail.apiEndpoint + "/openapi/user/get", {
            headers: {
                Authorization: exmailToken.token_type + " " + exmailToken.access_token
            },
            params: {
                alias: email
            },
            timeout: 5000
        });

        exmailErrorHandler(result.data);

        return result.data;
    },

    signupUser: function(user){

        check(user, {
            username: String,
            password: Match.Where(function(x){
                check(x, String);
                return x.length >= 6 && x.length <= 15;
            }),
            email: String,
            profile:{
                name: String,
                gender: Number,
                department: String,
                position: String
            }
        });

        var userId = Accounts.createUser(user);

        Accounts.sendVerificationEmail(userId);
    }


});

