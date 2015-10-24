exmailErrorHandler = function (result) {
    if (_.has(result, 'errcode')) {
        var errcode = result.errcode;
        if (errcode == 1301) {
            throw ERROR_EMAIL_NOT_FOUND;
        } else {
            throw ERROR_SERVER_ERROR;
        }
    }
}