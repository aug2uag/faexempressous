var http = require('http');
var util = require('util');

function AppError(status, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AppError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || 'Error';
}

util.inherits(AppError, Error);
AppError.prototype.name = 'AppError';
exports.AppError = AppError;

function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message || 'Error';
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';
exports.AuthError = AuthError;