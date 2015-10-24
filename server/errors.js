/*
Login and signup error.
 */
ERROR_USERNAME_ALREADY_EXISTS = new Meteor.Error('user_already_exists', 'User already exists.');
ERROR_EMAIL_ALREADY_EXISTS = new Meteor.Error('email_already_exists', 'Email already exists.');
ERROR_EMAIL_NOT_FOUND = new Meteor.Error('email_not_found', 'Email not found.');
ERROR_USER_NOT_FOUND = new Meteor.Error('user_not_found', 'User not found.');


ERROR_SERVER_ERROR = new Meteor.Error('server_error', 'Server error.');