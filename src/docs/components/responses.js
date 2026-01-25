module.exports = {
  NotFound: {
    description: 'Resource not found',
    content: {
      'application/json': {
        example: {
          status: 'fail',
          message: 'Resource not found',
        },
      },
    },
  },

  ServerError: {
    description: 'Internal server error',
    content: {
      'application/json': {
        example: {
          status: 'error',
          message: 'Internal server error',
        },
      },
    },
  },
};
