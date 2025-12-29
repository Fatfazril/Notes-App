module.exports = {
  NotFound: {
    description: 'Resource not found',
    content: {
      'application/json': {
        example: {
          status: 'fail',
          message: 'Note not found',
        },
      },
    },
  },

  ServerError: {
    description: 'Internal server error',
  },
};
