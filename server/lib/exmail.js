Exmail = {
    token :{
        token_type: '',
        access_token: ''
    },
    authorization: '',

    getUserByEmail: function (email) {
        var data = exmailPost('/openapi/user/get', {alias: email});

        var user = {
            name: data.Name,
            mobile: data.Mobile,
            department: data.PartyList.List[0].Value,
            position: data.Position,
            gender: data.Gender
        };
        return user;
    },
    getAllDepartments: function () {
        var data = exmailPost('/openapi/party/list', {partypath: ''});
        return _.pluck(data.List, 'Value');
    },
    getUsersInDepartment: function (department) {
        var data = exmailPost('/openapi/partyuser/list', {partypath: department});
        return _.pluck(data.List, 'Value');
    }
};

var errorHandler = function (result) {
    if (result) {
        if (_.has(result, 'errcode')) {
            var errcode = result.errcode;
            if (errcode == 1301) {
                throw ERROR_EMAIL_NOT_FOUND;
            } else {
                throw ERROR_SERVER_ERROR;
            }
        }
    } else {
        throw ERROR_SERVER_ERROR;
    }
};

var exmailPost = function (url, params) {
    var result = HTTP.post(Meteor.settings.exmail.apiEndpoint + url, {
        headers: {
            Authorization: Exmail.authorization
        },
        params: params,
        timeout: 3000
    });

    errorHandler(result.data);

    return result.data;
};





