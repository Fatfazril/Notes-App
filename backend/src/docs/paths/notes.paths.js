module.exports = {
  '/notes': {
    get: {
      tags: ['Notes'],
      summary: 'Get all notes',
      operationId: 'getAllNotes',
      responses: {
        200: {
          description: 'Success get all notes',
          content: {
            'application/json': {
              example: {
                status: 'success',
                results: 2,
                data: [
                  {
                    _id: '64f1a2c9e12a',
                    title: 'Meeting',
                    content: 'Discuss API design',
                    createdAt: '2025-01-01T10:00:00Z',
                  },
                  {
                    _id: '64f1a2d0b45c',
                    title: 'Todo',
                    content: 'Finish Swagger docs',
                    createdAt: '2025-01-02T08:30:00Z',
                  },
                ],
              },
            },
          },
        },
        500: {
          $ref: '#/components/responses/ServerError',
        },
      },
    },

    post: {
      tags: ['Notes'],
      summary: 'Create new note',
      operationId: 'createNote',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              title: 'Daily Plan',
              content: 'Learn Swagger OpenAPI',
            },
            schema: {
              $ref: '#/components/schemas/NoteRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Note created',
          content: {
            'application/json': {
              example: {
                status: 'success',
                data: {
                  _id: '64f1a2e9abcd',
                  title: 'Daily Plan',
                  content: 'Learn Swagger OpenAPI',
                  createdAt: '2025-01-03T09:00:00Z',
                },
              },
            },
          },
        },
        500: {
          $ref: '#/components/responses/ServerError',
        },
      },
    },
  },

  '/notes/{id}': {
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        example: '64f1a2c9e12a',
      },
    ],

    get: {
      tags: ['Notes'],
      summary: 'Get note by ID',
      operationId: 'getNoteById',
      responses: {
        200: {
          description: 'Success get note',
          content: {
            'application/json': {
              example: {
                status: 'success',
                data: {
                  _id: '64f1a2c9e12a',
                  title: 'Meeting',
                  content: 'Discuss API design',
                  createdAt: '2025-01-01T10:00:00Z',
                },
              },
            },
          },
        },
        404: {
          $ref: '#/components/responses/NotFound',
        },
      },
    },

    put: {
      tags: ['Notes'],
      summary: 'Update note by ID',
      operationId: 'updateNote',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              title: 'Updated title',
              content: 'Updated content',
            },
            schema: {
              $ref: '#/components/schemas/NoteRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Note updated',
          content: {
            'application/json': {
              example: {
                status: 'success',
                data: {
                  _id: '64f1a2c9e12a',
                  title: 'Updated title',
                  content: 'Updated content',
                  createdAt: '2025-01-01T10:00:00Z',
                },
              },
            },
          },
        },
        404: {
          $ref: '#/components/responses/NotFound',
        },
      },
    },

    delete: {
      tags: ['Notes'],
      summary: 'Delete note by ID',
      operationId: 'deleteNote',
      responses: {
        200: {
          description: 'Note deleted',
          content: {
            'application/json': {
              example: {
                status: 'success',
                message: 'Note deleted successfully',
              },
            },
          },
        },
        404: {
          $ref: '#/components/responses/NotFound',
        },
      },
    },
  },
};
