const swaggerUi = require('swagger-ui-express');

const base = require('./swagger');
const noteSchemas = require('./components/schemas/note.schema.js');
const authSchemas = require('./components/schemas/auth.schema.js');
const responses = require('./components/responses/common.response.js');
const authRespones = require('./components/responses/auth.respone.js')
const security = require('./components/security/jwt.security.js');
const notesPaths = require('./paths/notes.paths.js');
const authPaths = require('./paths/auth.path.js')

const swaggerSpec = {
  ...base,
  paths: {
    ...notesPaths,
    ...authPaths,
  },
  components: {
    schemas : {
      ...noteSchemas,
      ...authSchemas,
    },
    responses : {
      ...responses,
      ...authRespones,
    },
    securitySchemes: {
      ...security,
    },
  },
};

module.exports = { swaggerUi, swaggerSpec };
