Template.message.onCreated(function(){
   console.log('created');
});

Template.message.onRendered(function(){
    console.log('rendered');
});

Template.message.helpers({
    isFromMe: function () {
        var message = Template.instance().data;
        return Meteor.userId() === message.fromUserId;
    },
    withUser: function () {
        return Template.parentData();
    }
});