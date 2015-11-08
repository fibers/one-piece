Template.message.onRendered(function(){
    var displayView = $('#displayView');
    displayView.scrollTop(displayView.prop('scrollHeight'));
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