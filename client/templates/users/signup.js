Template.signup.onCreated(function () {
    this.validated = new ReactiveVar(false);
    this.profile = {};
});

Template.signup_detail.onRendered(function () {

    var gender = this.data.gender;

    if (gender === 1) {
        this.$('#radioMale').attr('checked', true);
    } else if (gender === 2) {
        this.$('#radioFemale').attr('checked', true);
    }
});

Template.signup.helpers({
    validated: function () {
        return Template.instance().validated.get();
    },
    profile: function () {
        return Template.instance().profile;
    }
});

Template.signup.events({

    'input #inputEmail': function (e, t) {

        var inputEmail = $(e.target);
        var email = inputEmail.val();

        inputEmail.next().addClass('hidden');
        inputEmail.parents('.form-group').eq(0).removeClass('has-error');

        if (_.isEmpty(email)) {
            t.$('#btnValidate').attr('disabled', true);
        } else {
            t.$('#btnValidate').attr('disabled', false);
        }
    },

    'input #inputPassword': function(e, t){

        var inputPassword = $(e.target);

        inputPassword.next().addClass('hidden');
        inputPassword.parents('.form-group').eq(0).removeClass('has-error');
    },

    'click #btnValidate': function (e, t) {

        e.preventDefault();

        var btn = $(e.target);
        btn.button('loading');

        var inputEmail = t.$('#inputEmail');
        var email = inputEmail.val();

        if (!_.contains(email, '@')) {

            btn.button('reset');
            inputEmail.parents('.form-group:first').addClass('has-error');
            inputEmail.next('span').removeClass('hidden');

            return
        }

        Meteor.call('validateEmail', email, function (error, result) {

            btn.button('reset');
            inputEmail.attr('readonly', true);

            if (error) {

                inputEmail.removeAttr('readonly');
                inputEmail.val('');

                alertError(error.reason);

            } else {

                btn.hide();

                var profile = {
                    name: result.Name,
                    mobile: result.Mobile,
                    department: result.PartyList.List[0].Value,
                    position: result.Position,
                    gender: result.Gender
                };
                t.profile = profile;

                t.validated.set(true);
            }
        });
    },

    'submit form': function (e, t) {

        e.preventDefault();

        var btnSignup = $(e.target).find(':submit');
        btnSignup.attr('disabled', true);

        var inputPassword = $(e.target).find('#inputPassword');
        if (inputPassword.val().length < 6 || inputPassword.val().length > 15) {

            btnSignup.attr('disabled', false);
            inputPassword.parents('.form-group:first').addClass('has-error');
            inputPassword.next('span').removeClass('hidden');

            return;
        }

        var username = $(e.target).find('#inputUsername').val();
        var password = inputPassword.val();
        var email = $(e.target).find('#inputEmail').val();
        var profile = {
            name: $(e.target).find('#inputName').val(),
            gender: parseInt(t.$("input[name='gender'][checked]").val()),
            department: $(e.target).find('#inputDepartment').val(),
            position: $(e.target).find('#inputPosition').val()
        };

        var user = {
                username: username,
                password: password,
                email: email,
                profile: profile
        };

        Meteor.call('signupUser', user, function(error, result){

            btnSignup.attr('disabled', false);

            if(error){
                alertError(error.reason);
            }else{
                Router.go('login');

                alertInfo('A verification email has been sent to your email ' +
                'by which you just registered on One Piece website, ' +
                'please click the link in the email to finish the registration.');
            }
        });

    }
});


Accounts.onEmailVerificationLink(function(token, done){

    Accounts.verifyEmail(token, function(error){
        if(error){
            alertError(error.reason);
        }else{
            Router.go('home');
            console.log(Meteor.user());

            //Debug
            alert("Welcome: " + Meteor.user().profile.name);
        }
    });

});