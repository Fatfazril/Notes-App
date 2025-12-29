const swaggerUi = require('swagger-ui-express');

const base = require('./swagger');
const schemas = require('./components/schemas');
const responses = require('./components/responses');
const security = require('./components/security');
const notesPaths = require('./paths/notes.paths');

const swaggerSpec = {
  ...base,
  paths: {
    ...notesPaths,
  },
  components: {
    schemas,
    responses,
    securitySchemes: security,
  },
};

module.exports = { swaggerUi, swaggerSpec };
