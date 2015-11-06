Template.message.helpers({
    isFromMe: function(){
        var message = Template.instance().data;
        return Meteor.userId() === message.fromUserId;
    },
    toUser: function(){
        return Template.parentData();
    }
})