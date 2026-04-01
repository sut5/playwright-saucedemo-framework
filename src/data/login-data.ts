export const LOGIN_DATA = {
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
} as const;

export const LOGIN_ERRORS = {
  lockedOut: /sorry, this user has been locked out/i,
  invalidCredentials: /do not match any user in this service/i,
  usernameRequired: /username is required/i,
  passwordRequired: /password is required/i,
} as const;
