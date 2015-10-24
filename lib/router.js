PERMISSION_EXCLUDE_ROUTE = ['signup', 'login'];

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function () {

    var routeName = this.route.getName();
    if(_.contains(PERMISSION_EXCLUDE_ROUTE, routeName)){
        this.next();
    }else{
        if (!Meteor.userId()){
            this.layout(null);
            this.render('login');
        } else {
            this.next();
        }
    }
});

Router.route('/', function () {
    this.render('home')
}, {
    name: 'home'
});

Router.route('/login', function () {
    this.layout(null);
    this.render('login');
}, {
    name: 'login'
});

Router.route('/signup', function () {
    this.layout(null);
    this.render('signup');
}, {
    name: 'signup'
});

Router.route('/logout', function () {
    Meteor.logout();
    Router.go('login');
}, {
    name: 'logout'
});










