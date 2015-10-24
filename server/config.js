/*
    Accounts configuration
 */
Accounts.emailTemplates.from = "server@ufindr.cn";
Accounts.emailTemplates.siteName = "http://www.yuxip.com";
Accounts.emailTemplates.verifyEmail.subject = function(user){
    return "Welcome to One Piece, " + user.profile.name;
};
Accounts.emailTemplates.verifyEmail.text = function(user, url){
    return "To activate your One Piece account, simply click the link below:\n\n"
        + url;
};



