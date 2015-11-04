/**
 * Authentication
 */
Meteor.methods({
    validateEmail: function (email) {
        check(email, String);

        if (Accounts.findUserByEmail(email)) {
            throw ERROR_USERNAME_ALREADY_EXISTS;
        }

        var user = Exmail.getUserByEmail(email);
        return user;
    },
    signupUser: function (user) {
        check(user, {
            username: String,
            password: Match.Where(function (x) {
                check(x, String);
                return x.length >= 6 && x.length <= 15;
            }),
            email: String,
            profile: {
                name: String,
                gender: Number,
                department: String,
                position: String
            }
        });

        var userId = Accounts.createUser(user);
        Accounts.sendVerificationEmail(userId);
    },
    isVerifiedEmail: function (identification) {
        if ((user = Accounts.findUserByUsername(identification)) ||
            (user = Accounts.findUserByEmail(identification))) {
            var email = user.emails[0];
            return email.verified;
        } else {
            throw ERROR_USER_NOT_FOUND;
        }
    }
});

