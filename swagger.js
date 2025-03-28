const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Face Swap API',
      version: '1.0.0',
      description: 'API documentation for the Face Swap AI project',
      contact: {
        name: 'Erkan Sivas',
        email: 'erkan@erkansivas.xyz'
      }
    },
    servers: [
      {
        url: 'http://localhost:4355/api',
        description: 'Development Server'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/routes/*/*.js', './src/docs/*.yaml', './src/docs/*/*.yaml']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;