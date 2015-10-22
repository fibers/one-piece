Template.login.events({
    'submit form': function(e){
        e.preventDefault();

        var user = {
            email: e.target.email.value,
            password: e.target.password.value
        };
    }

});