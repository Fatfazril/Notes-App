module.exports = {
  RegisterRequest: {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      username: { type: 'string' },
      password: { type: 'string', format: 'password' },
    },
  },

  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', format: 'password' },
    },
  },

  AuthResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          email: { type: 'string' },
          username: { type: 'string' },
        },
      },
      accessToken: { type: 'string' },
    },
  },
};
