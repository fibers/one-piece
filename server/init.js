Meteor.startup(function () {
    var oauthParams = {
        grant_type: Meteor.settings.exmail.grantType,
        client_id: Meteor.settings.exmail.clientId,
        client_secret: Meteor.settings.exmail.clientSecret
    };

    var options = {
        params: oauthParams
    };

    HTTP.post(Meteor.settings.exmail.oauthEndpoint, {
        params: oauthParams
    }, function (error, result) {
        if (error) {
            throw new Meteor.Error(error);
        } else {
            Exmail.token = result.data;
            Exmail.authorization = Exmail.token.token_type + " " + Exmail.token.access_token;
        }
    });

    process.env.MAIL_URL = Meteor.settings.exmail.mail_url;
});

