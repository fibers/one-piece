Template.chat.helpers({
    messages: function () {
        var withUser = Template.instance().data;
        var messages = Messages.find({
            $or: [
                {toUserId: withUser._id},
                {fromUserId: withUser._id}
            ]
        }, {sort: {timestamp: 1}});

        messages.observeChanges({
            added: function (id, message) {
                if (message.toUserId === Meteor.userId()
                    && message.read === false) {
                    Messages.update(id, {$set: {read: true}});
                }
            }
        });

        Tracker.onInvalidate(function(c){
            console.log(c);
            console.log('invalidate');
        });

        return messages;
    }
});

Template.chat.events({
    'input #inputMessage': function (e, t) {
        var inputMessage = $(e.target);
        var message = inputMessage.val();

        if (_.isEmpty(message)) {
            t.$('#btnSend').attr('disabled', true);
        } else {
            t.$('#btnSend').attr('disabled', false);
        }
    },
    'keyup #inputMessage': function (e, t) {
        if (e.type === 'keyup' && e.which === 13) {
            t.$('#btnSend').trigger('click');
        }
    },
    'click #btnSend': function (e, t) {
        var inputMessage = t.$('#inputMessage');
        var btnSend = t.$('#btnSend');
        var withUser = t.data;

        Messages.insert({
            fromUserId: Meteor.userId(),
            toUserId: withUser._id,
            content: inputMessage.val(),
            timestamp: moment().format('X'),
            read: false
        });

        inputMessage.val('');
        btnSend.attr('disabled', true);

        var displayView = t.$('#displayView');
        displayView.scrollTop(displayView.prop('scrollHeight'));
    }
});