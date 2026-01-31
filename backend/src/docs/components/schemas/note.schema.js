module.exports = {
  Note: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  },

  NoteRequest: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
    },
  },
};
