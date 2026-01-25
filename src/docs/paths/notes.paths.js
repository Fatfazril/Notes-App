module.exports = {
  '/notes': {
    get: {
      tags: ['Notes'],
      summary: 'Get all notes',
      responses: {
        200: {
          description: 'Success',
        },
        500: {
          $ref: '#/components/responses/ServerError',
        },
      },
    },

    post: {
      tags: ['Notes'],
      summary: 'Create new note',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NoteRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Created',
        },
      },
    },
  },

  '/notes/{id}': {
    get: {
      tags: ['Notes'],
      summary: 'Get note by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Success',
        },
        404: {
          $ref: '#/components/responses/NotFound',
        },
      },
    },
  },
};
