// const express = require('express');
// require('dotenv').config();
// const app = express();
// // Book routes
// const bookRoutes = require('./Routes/BooksRoutes');

// const port = process.env.PORT || 3000

// // Middleware to parse JSON
// app.use(express.json());


// app.use('/books', bookRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port :${port} `);
// });


require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Book routes
const bookRoutes = require('./Routes/BooksRoutes')

const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple Express Book API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./Routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/books', bookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});