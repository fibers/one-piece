Template.login.events({
    'submit form': function (e) {
        e.preventDefault();

        var form = $(e.target);
        var inputIdentification = form.find('#inputIdentification');
        var inputPassword = form.find('#inputPassword');

        Meteor.call('isVerifiedEmail', inputIdentification.val(), function (error, result) {
            if (error) {
                alertError(error.reason);
                inputIdentification.val('');
                inputPassword.val('');
            } else {
                if (result) {
                    Meteor.loginWithPassword(inputIdentification.val(), inputPassword.val(),
                        function (error) {
                            if (error) {
                                alertError(error.reason);
                            } else {
                                Router.go('home');
                            }
                        });
                } else {
                    alertWarning('Please check your email to activate your One Piece\'s account');
                }
            }
        });
    }
});