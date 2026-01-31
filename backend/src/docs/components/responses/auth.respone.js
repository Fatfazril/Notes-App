module.exports = {
  Unauthorized: {
    description: 'Invalid credentials',
    content: {
      'application/json': {
        example: {
          success: false,
          message: 'Invalid Credentials',
        },
      },
    },
  },

  Conflict: {
    description: 'User already exists',
    content: {
      'application/json': {
        example: {
          success: false,
          message: 'User already exists',
        },
      },
    },
  },
};
