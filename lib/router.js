Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'

});

Router.route('/login', function () {
    this.layout('');
    this.render('login');
}, {
    name: 'login'
});

Router.route('/signup', function () {
    this.layout('');
    this.render('signup');
}, {
    name: 'signup'
});

Router.route('/logout', function () {

    Meteor.logout();
    Router.go('login');
}, {
    name: 'logout'
})

Router.route('/', function () {

}, {
    name: 'home'
});









