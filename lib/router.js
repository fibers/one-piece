Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});


Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.layout(null);
        this.redirect('login');
    } else {
        this.next();
    }
}, {
    except: ['signup', 'login']
});

Router.onAfterAction(function () {
    Alerts.remove({});
}, {
    except: ['signup', 'login']
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
    this.redirect('login');
}, {
    name: 'logout'
});

Router.route('/departments', function () {
    this.render('departments');
}, {
    name: 'departments',
    waitOn: function(){
        return [Meteor.subscribe('allUsers'), Meteor.subscribe('myMessages')];
    }
});








